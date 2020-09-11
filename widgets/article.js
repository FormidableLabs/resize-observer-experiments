import { html, ow, lorem } from '../index.js';

export default ({ data }) => html`
  <img
    src=${data.img}
    className=${ow`w-full object-cover`}
    style="height:32em"
  />
  <article className="prose prose-lg color-white">
    <div className=${ow`p-16`}>
      <h1>${data.longTitle}</h1>
      <h3>${data.subTitle}</h3>
      <p>${data.longDescription}</p>
      <p>${lorem(30)}</p>
      <p>${lorem(20)}</p>
      <img
        src="https://source.unsplash.com/collection/1103088/${(500 +
          Math.random() * 100) <<
        0}x${(400 + Math.random() * 100) << 0}"
      />
      <p>${lorem(15)}</p>
      <p>${lorem(25)}</p>
      <b>${lorem(5)}</b>
    </div>
  </article>
`;
