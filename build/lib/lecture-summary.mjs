/** @param {import('../../parser/index.js').Lecture | undefined} lec */
export function lectureSummaryFromLec(lec) {
  if (!lec) {
    return { id: '', title: '', tag: '', partsCount: 0, mcqCount: 0, sectionCount: 0 };
  }
  const mcqPart = lec.parts?.find(p => p.type === 'mcq');
  const detailPart = lec.parts?.find(p => p.type === 'detail');
  const summaryPart = lec.parts?.find(p => p.type === 'summary');
  let miniMcqCount = 0;
  for (const p of lec.parts || []) {
    for (const b of p.blocks || []) {
      if (b.type === 'mini-mcq') miniMcqCount += 1;
    }
  }
  return {
    id: lec.id || '',
    title: lec.title || '',
    tag: lec.tag || '',
    partsCount: lec.parts?.length || 0,
    mcqCount: (mcqPart?.questions?.length || 0) + miniMcqCount,
    sectionCount: (detailPart || summaryPart)?.subsections?.length || 0,
  };
}
