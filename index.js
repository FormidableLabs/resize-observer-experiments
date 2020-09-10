import { render, h } from 'https://unpkg.com/preact@latest?module';
import { useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import { themed } from 'https://unpkg.com/oceanwind/index.min.js';

import useResizeObserver from './useResizeObserver.js';
import card from './widgets/card.js';

import htm from 'https://unpkg.com/htm?module';
export const html = htm.bind(h);

export const ow = themed({
  scale: {
    102: '1.02',
  },
});

const Resizeable = ({ template }) => {
  const [data, setData] = useState({
    orientation: 'X',
    color: Math.random(),
    initial: {
      width: [320, 480, 640, 768][(Math.random() * 3) << 0],
      height: [320, 480, 640, 768][(Math.random() * 3) << 0],
    },
  });

  const { ref } = useResizeObserver({
    onResize: ({ width, height }) => {
      const sizes = {
        XS: 480,
        SM: 640,
        MD: 768,
        LG: 1024,
        XL: 1280,
      };

      const size = Object.entries(sizes).find(([, x]) => width < x);

      setData({
        ...data,
        width,
        height,
        orientation: width / height > 1 ? 'L' : 'P',
        area: width,
        size,
        child: template[size ? size[0] : 'XL'],
      });
    },
  });

  return html`
    <div
      className=${ow`
        relative
        flex-1
        flex
        flex-col
        items-start
        justify-start
        mr-10
        mb-10
        rounded-xl
        overflow-hidden
        hover:scale-102
        transition
        duration-150
        ease-in-out
        hover:cursor-pointer
        shadow-xl
      `}
      style="flex:${data.initial.width}px;"
      ref=${ref}
    >
      ${data.child}
    </div>
  `;
};

const app = () => {
  const [widgets, setWidgets] = useState(
    Array.from({ length: 12 }, () => ({
      id: Math.random().toString(36),
      img: `https://source.unsplash.com/collection/1103088/${
        (1000 + Math.random() * 100) << 0
      }x${(1000 + Math.random() * 100) << 0}`,
    }))
  );
  return html`
    <main className=${ow`flex h-screen pt-10 px-10`} style="background:#131313">
      <section
        className=${ow`m-auto flex flex-wrap items-stretch pt-10 pl-10 rounded-2xl`}
        onClick=${(e) =>
          setWidgets([...widgets].sort((x) => 0.5 - Math.random()))}
      >
        ${widgets.map(
          (i) =>
            html`
              <${Resizeable}
                key=${i.id}
                template=${{
                  XS: card.XS(i),
                  SM: card.SM(i),
                  MD: card.MD(i),
                  LG: card.LG(i),
                  XL: card.XL(i),
                }}
              />
            `
        )}
      </section>
      <aside></aside>
    </main>
  `;
};

render(h(app), document.body);
