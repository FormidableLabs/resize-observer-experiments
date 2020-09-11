import { html, ow } from '../index.js';
import useResizeObserver from '../useResizeObserver.js';

export const template = (props) => {
  const { ref, width } = useResizeObserver();
  const { className, ...rest } = props;

  let style;
  switch (true) {
    case width > 1024:
    case width > 768:
      style = ow`p-6 pl-10 text-3xl max-w-full`;
      break;
    case width > 640:
    case width > 320:
      style = ow`p-6 pl-10 text-2xl max-w-full`;
      break;
    default:
      style = ow`p-4 pl-8 text-lg max-w-full`;
      break;
  }

  console.log(width);

  return html`
    <div ref=${ref}>
      <input className="${style} ${className}" ...${rest} />
    </div>
  `;
};
