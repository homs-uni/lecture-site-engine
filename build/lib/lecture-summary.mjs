/** @param {import('../../parser/index.js').Lecture | undefined} lec */
export function lectureSummaryFromLec(lec) {
  if (!lec) {
    return { id: '', title: '', tag: '', partsCount: 0, mcqCount: 0, sectionCount: 0 };
  }
  const mcqPart = lec.parts?.find(p => p.type === 'mcq');
  const detailPart = lec.parts?.find(p => p.type === 'detail');
  return {
    id: lec.id || '',
    title: lec.title || '',
    tag: lec.tag || '',
    partsCount: lec.parts?.length || 0,
    mcqCount: mcqPart?.questions?.length || 0,
    sectionCount: detailPart?.subsections?.length || 0,
  };
}
