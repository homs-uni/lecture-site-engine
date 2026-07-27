const KEY_POOL = ["a", "b", "c", "d", "e", "f"];

// Position-based correspondence between internal option keys and the
// Arabic option letters used inside `explain` text (SCHEMA.md §4: أ ب ج د).
// Per SCHEMA.md the standard MCQ template is always exactly 4 options —
// e/f (ه/و) are defensive only, in case that ever changes.
const KEY_TO_ARABIC = { a: "أ", b: "ب", c: "ج", d: "د", e: "ه", f: "و" };

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Rewrites Arabic-letter option references inside `explain` text so they
 * still point at the right option after shuffling. Only touches letters
 * at the start of a line (optionally preceded by a "-"/"*" bullet), which
 * is how every "أ) ..." / "* ب) ..." rationale line is written per the
 * MCQ template — avoids false-positives on Arabic prose elsewhere (ب/و
 * are extremely common standalone Arabic words/prefixes).
 */
function remapExplanationLetters(explain, keyMap) {
  if (!explain) return explain;

  const letterMap = {};
  for (const [oldKey, newKey] of Object.entries(keyMap)) {
    const oldLetter = KEY_TO_ARABIC[oldKey];
    const newLetter = KEY_TO_ARABIC[newKey];
    if (oldLetter && newLetter) letterMap[oldLetter] = newLetter;
  }
  if (!Object.keys(letterMap).length) return explain;

  return (
    explain
      // Form 1: "أ)" / "* ب)" / "- ج)" at start of a line (SCHEMA.md option-rationale lines)
      .replace(/^(\s*[-*]?\s*)([أبجدهو])\)/gm, (full, prefix, letter) =>
        letterMap[letter] ? `${prefix}${letterMap[letter]})` : full,
      )
      // Form 2: "(أ)" parenthesized, anywhere in the text (e.g. تذكرة callouts,
      // inline references like "راجع خيار (ب) أعلاه")
      .replace(/\(([أبجدهو])\)/g, (full, letter) =>
        letterMap[letter] ? `(${letterMap[letter]})` : full,
      )
  );
}
function randomizeQuestion(question) {
  if (!question?.options?.length) return question;

  const optionCount = question.options.length;
  if (optionCount > KEY_POOL.length) {
    console.warn(
      `MCQ ${question.num}: ${optionCount} options exceeds supported max (${KEY_POOL.length}).`,
    );
    return question;
  }
  const displayKeys = KEY_POOL.slice(0, optionCount);

  const originalOptions = question.options.map((opt) => ({ ...opt }));
  const correctOption = originalOptions.find((o) => o.key === question.correct);
  if (!correctOption) {
    console.warn(`MCQ ${question.num}: cannot find correct option "${question.correct}".`);
    return question;
  }

  const shuffledWrong = shuffle(originalOptions.filter((o) => o.key !== question.correct));
  const correctPosition = Math.floor(Math.random() * displayKeys.length);

  const newOptions = [];
  const keyMap = {}; // oldKey -> newKey
  let wrongIndex = 0;
  let newCorrect = null;

  for (let i = 0; i < displayKeys.length; i++) {
    const option = i === correctPosition ? correctOption : shuffledWrong[wrongIndex++];
    const key = displayKeys[i];
    keyMap[option.key] = key;
    newOptions.push({ ...option, key });
    if (option === correctOption) newCorrect = key;
  }

  return {
    ...question,
    options: newOptions,
    correct: newCorrect,
    explain: remapExplanationLetters(question.explain, keyMap),
  };
}

function randomizeGroup(group) {
  return {
    ...group,
    questions: group.questions.map(randomizeQuestion),
  };
}

export function randomizeMcqs(questions) {
  return questions.map((q) => (q.type === "group" ? randomizeGroup(q) : randomizeQuestion(q)));
}
