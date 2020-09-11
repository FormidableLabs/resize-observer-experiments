import { html, ow } from '../index.js';
import useResizeObserver from '../useResizeObserver.js';

export const template = ({ children }) => {
  const { ref, width } = useResizeObserver();

  let gap;
  switch (true) {
    case width > 1024:
      gap = '3rem';
      break;
    case width > 768:
      gap = '2.5rem';
      break;
    case width > 640:
      gap = '2rem';
      break;
    case width > 480:
      gap = '1.25rem';
      break;
    default:
      gap = '1rem';
      break;
  }

  return html`
    <div
      ref=${ref}
      className=${ow`flex flex-wrap items-stretch`}
      style="gap:${gap}"
    >
      ${children}
    </div>
  `;
};
