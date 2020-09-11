import { html, ow } from '../index.js';
import useResizeObserver from '../useResizeObserver.js';

export const template = (props) => {
  const { ref, width } = useResizeObserver();

  let style;
  switch (true) {
    case width > 1024:
    case width > 768:
      style = ow`w-full p-6 text-3xl min-w-0 bg-gray-400 rounded-full pl-10 placeholder-gray-600 border-solid border-4 border-gray-500`;
      break;
    case width > 640:
    case width > 320:
      style = ow`w-full p-6 text-2xl min-w-0 bg-gray-400 rounded-full pl-10 placeholder-gray-600 border-solid border-4 border-gray-500`;
      break;
    default:
      style = ow`w-full p-6 pl-8 text-lg min-w-0 bg-gray-400 rounded-full placeholder-gray-600 border-solid border-4 border-gray-500`;
      break;
  }

  return html` <input ref=${ref} className=${style} ...${props} /> `;
};
