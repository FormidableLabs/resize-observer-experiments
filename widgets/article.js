import { html, ow, lorem } from '../index.js';
import { useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import useResizeObserver from '../useResizeObserver.js';

export default ({ data }) => {
  const { ref, width } = useResizeObserver();

  let proseSize;
  switch (true) {
    case width > 1024:
      proseSize = 'prose-xl';
      break;
    case width > 768:
      proseSize = 'prose-lg';
      break;
    case width > 640:
      proseSize = 'prose-md';
      break;
    case width > 480:
      proseSize = 'prose-sm';
      break;
    default:
      proseSize = 'prose-xs';
      break;
  }

  const [state] = useState({
    img: `${(500 + Math.random() * 100) << 0}x${
      (400 + Math.random() * 100) << 0
    }`,
    body: [...Array(5)].map(
      (x) => html`<p>${lorem((20 + Math.random() * 40) << 0)}</p>`
    ),
  });

  return html`
    <img
      src=${data.img}
      className=${ow`w-full object-cover`}
      style="height:32em"
    />
    <article
      ref=${ref}
      key=${data.id}
      className="prose ${proseSize} color-white"
    >
      <div className=${ow`p-16`}>
        <h1>${data.longTitle}</h1>
        <h2>${data.subTitle}</h2>
        <p>${data.longDescription}</p>
        <img
          className=${ow`py-6`}
          src="https://source.unsplash.com/collection/1103088/${state.img}"
        />
        ${state.body}
      </div>
    </article>
  `;
};
