#!/usr/bin/env node
/**
 * Local dev server: build once, then rebuild automatically whenever source
 * files change, and serve the output with live-reload.
 *
 * Usage:
 *   node build/watch.mjs --subject year-3/ai-theory [--port 8080]
 *   node build/watch.mjs --all [--port 8080]
 */
import { spawn } from "node:child_process"
import { watch } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ENGINE_ROOT = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    ".."
)

function parseArgs(argv) {
    const args = { subject: null, all: false, port: "8080" }
    for (let i = 2; i < argv.length; i++) {
        if (argv[i] === "--subject" && argv[i + 1]) args.subject = argv[++i]
        else if (argv[i] === "--all") args.all = true
        else if (argv[i] === "--port" && argv[i + 1]) args.port = argv[++i]
    }
    return args
}

function run(cmd, args) {
    return new Promise((resolve, reject) => {
        const child = spawn(cmd, args, {
            stdio: "inherit",
            cwd: ENGINE_ROOT,
            shell: process.platform === "win32", // use shell on Windows to find .cmd files
        })
        child.on("exit", (code) =>
            code === 0
                ? resolve()
                : reject(new Error(`${cmd} exited with code ${code}`))
        )
        child.on("error", reject)
    })
}

function debounce(fn, ms) {
    let timer
    return (...a) => {
        clearTimeout(timer)
        timer = setTimeout(() => fn(...a), ms)
    }
}

async function refreshHub() {
    await run(process.execPath, ["build/generate-dist-index.mjs"])
}

/** @param {boolean} hubOnly — skip subject rebuild (hub generator changed) */
async function build(all, subject, hubOnly = false) {
    try {
        if (hubOnly) {
            await refreshHub()
        } else if (all) {
            await run(process.execPath, ["build/deploy-build.mjs", "--all"])
        } else {
            await run(process.execPath, ["build/cli.mjs", "--subject", subject])
            await refreshHub()
        }
        console.log("✓ rebuilt — waiting for changes...\n")
    } catch (err) {
        console.error(`✗ build failed: ${err.message}\n`)
    }
}

function isHubGeneratorChange(filename) {
    return filename && path.basename(filename) === "generate-dist-index.mjs"
}

async function main() {
    const { subject, all, port } = parseArgs(process.argv)
    if (!subject && !all) {
        console.error(
            "Usage:\n" +
                "  node build/watch.mjs --subject <year-N/subject-id> [--port 8080]   (one subject)\n" +
                "  node build/watch.mjs --all [--port 8080]                          (whole site)"
        )
        process.exit(1)
    }

    const subjectRel = subject ? subject.replace(/^subjects\//, "") : null
    const outDir = all
        ? path.join(ENGINE_ROOT, process.env.OUTPUT_DIR || "dist")
        : path.join(ENGINE_ROOT, process.env.OUTPUT_DIR || "dist", subjectRel)

    await build(all, subject)

    const rebuild = debounce((filename) => {
        build(all, subject, isHubGeneratorChange(filename))
    }, 250)

    const watchDirs = all
        ? [
              path.join(ENGINE_ROOT, "subjects"),
              path.join(ENGINE_ROOT, "site-shell"),
              path.join(ENGINE_ROOT, "renderer"),
              path.join(ENGINE_ROOT, "themes"),
              path.join(ENGINE_ROOT, "build"),
          ]
        : [
              path.join(ENGINE_ROOT, "subjects", subjectRel),
              path.join(ENGINE_ROOT, "site-shell"),
              path.join(ENGINE_ROOT, "renderer"),
              path.join(ENGINE_ROOT, "themes"),
              path.join(ENGINE_ROOT, "build"),
          ]

    for (const dir of watchDirs) {
        try {
            watch(dir, { recursive: true }, (_event, filename) => {
                console.log(`↻ change detected: ${filename || dir}`)
                rebuild(filename)
            })
            console.log(`watching ${path.relative(ENGINE_ROOT, dir)}`)
        } catch (err) {
            console.warn(`could not watch ${dir}: ${err.message}`)
        }
    }

    console.log(`\nStarting live-reload server → http://localhost:${port}\n`)
    await run("npx", [
        "--yes",
        "live-server",
        outDir,
        `--port=${port}`,
        "--no-browser",
    ])
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
