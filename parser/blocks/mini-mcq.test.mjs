#!/usr/bin/env node
import { createParser } from '../index.js';

const md = `## ملخص المفاهيم

### الفقرة 1: أزمة البرمجيات

3 أعراض والسبب الجذري هو التعقيد.

#### تحقق سريع:
What is the primary cause of the software crisis?
أ) Hardware
ب) Open source
ج) Agile
د) Inability to meet requirements and deadlines
**الإجابة: د**
> مظاهر فشل تلبية المتطلبات والمواعيد.

#### سؤال سريع:
**المصدر:** [نمط 2023]
A metric is:
أ) an ISO unit
ب) a process
ج) a relation of measures
د) a tool
**الإجابة الصحيحة: ج**
> Metrics تربط عدة measures.
`;

const { parseBlocks } = createParser();
const blocks = parseBlocks(md);
const minis = blocks.filter(b => b.type === 'mini-mcq');

if (minis.length !== 2) throw new Error(`expected 2 mini-mcq, got ${minis.length}`);
if (minis[0].correct !== 'd') throw new Error(`q1 correct want d got ${minis[0].correct}`);
if (minis[0].options.length !== 4) throw new Error(`q1 want 4 opts got ${minis[0].options.length}`);
if (!minis[0].explain.includes('متطلبات')) throw new Error('q1 explain missing');
if (minis[1].correct !== 'c') throw new Error(`q2 correct want c got ${minis[1].correct}`);
if (minis[1].source !== 'نمط 2023') throw new Error(`q2 source got ${minis[1].source}`);

console.log('mini-mcq parser test: OK');
