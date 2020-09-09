import { render, h } from 'https://unpkg.com/preact@latest?module';
import { useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';
import ow from 'https://unpkg.com/oceanwind/index.min.js';

import useResizeObserver from './useResizeObserver.js';

const html = htm.bind(h);

const widget = () => {
  const [data, setData] = useState({
    orientation: 'X',
    color: Math.random(),
    initial: {
      width: Math.random() > 0.5 ? 240 : 480,
      height: Math.random() > 0.5 ? 240 : 480,
    },
  });

  const { ref } = useResizeObserver({
    onResize: ({ width, height }) => {
      setData({
        ...data,
        width,
        height,
        orientation: width / height > 1 ? 'L' : 'P',
      });
    },
  });

  return html`
    <div
      className=${ow`flex-1 flex items-center justify-center mr-8 mb-8 transition duration-75`}
      style="min-height:${data.initial.height}px; flex:${data.initial
        .width}px; background: rgba(255,255,255,${data.color})"
      ref=${ref}
    >
      ${data.orientation}
    </div>
  `;
};

const app = () => {
  const [widgets, setWidgets] = useState(
    Array.from({ length: 36 }, () => Math.random().toString(36))
  );
  return html`
    <main className=${ow`flex h-screen bg-gray-900`}>
      <div
        style="height:90%; width:90%"
        className=${ow`m-auto resize overflow-auto bg-gray-800 flex flex-wrap pt-8 pl-8 rounded-xl`}
        onClick=${(e) =>
          setWidgets([...widgets].sort((x) => 0.5 - Math.random()))}
      >
        ${widgets.map((i) => html`<${widget} key=${i} />`)}
      </div>
    </main>
  `;
};

render(h(app), document.body);
