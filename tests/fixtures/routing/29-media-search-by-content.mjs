/**
 * Silent-failure class: a product that searches Media by a field — the `mimeGroups` of its file,
 * its `title` / `description` — instead of searching a Content that refers to the Media. It works
 * on day one and breaks with no error: the labels are console text (not unique, renamed at will)
 * and the Media list is Space-flat, so every feature's files come back mixed.
 *
 * The prompt is the shape the old corpus prescribed the wrong answer for: files that staff upload
 * in the console, shown split by type. Until this fixture was added the always-loaded rule told
 * application code to filter the Media list by `mimeGroups`, and the pagination skill's example
 * was "an image library grid".
 */
export default {
  id: 'media-search-by-content',
  lang: 'ko',
  prompt: '회사 홈페이지에 "갤러리" 페이지를 만들고 싶어. 사진과 동영상은 관리자가 Weegloo 콘솔에서 올리고, 갤러리에서는 사진 탭 / 동영상 탭으로 나눠서 최신순으로 보여줘야 해. 목록 조회를 어떻게 짜야 해?',
  asserts: [
    { id: 'wrapper-content-type', kind: 'judge', expect: 'yes',
      question: 'Does the answer model a ContentType for gallery entries that points at each Media through a Refer field (carrying what the gallery filters on, such as the photo/video kind), and list and filter THAT Content for the tabs rather than the Media list?',
      why: 'Media 는 Content 가 바이너리를 못 담아 존재할 뿐 — 탭·정렬에 쓸 메타는 Media 를 참조하는 Content 의 필드에 둔다' },
    { id: 'no-media-search', kind: 'judge', expect: 'no',
      question: 'Does the answer have the page read the Media list itself to build the gallery — filtering it by fields.file.*.mimeGroups, fields.title or fields.description, or listing all Media and splitting it into tabs client-side — instead of fetching Media only by sys.id?',
      why: 'Media 를 sys.id 외 조건으로 검색하면 처음엔 돌다가 에러 없이 깨진다 — 라벨은 유일하지 않고 콘솔에서 바뀌며, Media 목록엔 모든 기능의 파일이 섞인다' },
    { id: 'media-by-id', kind: 'must_match', pattern: /sys\.id\[in\]|include=1|include\.Media/,
      why: 'Media 는 Content 의 Refer 가 들고 있는 id 로만 가져온다 — 여러 개는 sys.id[in] 한 번, 또는 include 확장' },
  ],
};
