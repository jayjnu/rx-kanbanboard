export default function suggestListItems(data) {
  return (`
    <li>
      <dl>
        <dt>포스터</dt>
        <dd><img src="${data.imgSrc}" width="100" alt=""></dd>
      </dl>
      <dl>
        <dt>제목</dt>
        <dd>${data.title}</dd>
        <dt>개봉</dt>
        <dd>${data.pubYear}</dd>
      </dl>
    </li>
  `)
}