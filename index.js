import { render, h } from 'https://unpkg.com/preact@latest?module';
import { useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';
import { themed } from 'https://unpkg.com/oceanwind/index.min.js';

import useResizeObserver from './useResizeObserver.js';

const ow = themed({
  scale: {
    102: '1.02',
  },
});

const html = htm.bind(h);

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
      <div
        style="height:100%; width:100%;"
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
                  XS: html`
                    <div
                      className=${ow`bg-gray-600 w-full h-full flex`}
                      style="background-image: url('${i.img}'), linear-gradient(to bottom, #333, #111); background-size: cover; background-blend-mode: overlay;"
                    >
                      <div
                        className=${ow`space-y-4 p-10 bottom-0 opacity-75 transition duration-300 ease-in-out hover:opacity-100 relative z-1 mt-auto`}
                      >
                        <h1
                          className=${ow`font-bold cap-20-10 text-white opacity-90`}
                        >
                          Lorem ipsum
                        </h1>
                        <a className=${ow`text-white block underline cap-12-0`}
                          >Read more</a
                        >
                      </div>
                    </div>
                  `,
                  SM: html`
                    <div
                      className=${ow`bg-gray-600 w-full h-full flex`}
                      style="background-image: url('${i.img}'), linear-gradient(to bottom, #333, #111); background-size: cover; background-blend-mode: overlay;"
                    >
                      <div
                        className=${ow`space-y-8 p-16 bottom-0 opacity-75 transition duration-300 ease-in-out hover:opacity-100 relative z-1 mt-auto`}
                      >
                        <h1
                          className=${ow`font-bold cap-24-10 text-white opacity-90`}
                        >
                          Lorem ipsum dolor sit
                        </h1>
                        <p
                          className=${ow`cap-13-14 max-w-4xl text-white opacity-75`}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed do eiusmod.
                        </p>
                        <a
                          className=${ow`text-white block underline cap-16-0 pt-1`}
                          >Read more</a
                        >
                      </div>
                    </div>
                  `,
                  MD: html`
                    <div
                      className=${ow`bg-gray-600 w-full h-full flex`}
                      style="background-image: url('${i.img}'), linear-gradient(to bottom, #333, #111); background-size: cover; background-blend-mode: overlay;"
                    >
                      <div
                        className=${ow`space-y-6 px-24 py-24 bottom-0 opacity-75 transition duration-300 ease-in-out hover:opacity-100 relative z-1 mt-auto`}
                      >
                        <h1
                          className=${ow`font-bold cap-28-20 text-white opacity-90`}
                        >
                          Lorem ipsum dolor sit
                        </h1>
                        <div className=${ow`w-10 border-1 border-white`}></div>
                        <p
                          className=${ow`cap-14-14 max-w-4xl text-white opacity-75`}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                        <a
                          className=${ow`text-white block underline cap-16-0 pt-2`}
                          >Read the article</a
                        >
                      </div>
                    </div>
                  `,
                  LG: html`
                    <div
                      className=${ow`bg-gray-600 w-full h-full flex`}
                      style="background-image: url('${i.img}'), linear-gradient(to bottom, #333, #111); background-size: cover; background-blend-mode: overlay;"
                    >
                      <div
                        className=${ow`space-y-8 px-24 py-24 bottom-0 opacity-75 transition duration-300 ease-in-out hover:opacity-100 relative z-1 mt-auto`}
                      >
                        <h1
                          className=${ow`font-bold cap-36-28 text-white opacity-90`}
                        >
                          Lorem ipsum dolor sit
                        </h1>
                        <h2
                          className=${ow`font-bold cap-24-32 text-white opacity-90`}
                        >
                          Onsectetur adipiscing elit.
                        </h2>
                        <p
                          className=${ow`cap-16-16 max-w-4xl text-white opacity-75`}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                        <a
                          className=${ow`text-white block underline cap-18-0 pt-3`}
                          >Read the article</a
                        >
                      </div>
                    </div>
                  `,
                  XL: html`
                    <div
                      className=${ow`bg-gray-600 w-full h-full flex`}
                      style="background-image: url('${i.img}'), linear-gradient(to bottom, #333, #111); background-size: cover; background-blend-mode: overlay;"
                    >
                      <div
                        className=${ow`px-24 py-24 bottom-0 opacity-75 transition duration-300 ease-in-out hover:opacity-100 relative z-1 mt-auto`}
                      >
                        <div
                          className=${ow`pl-16 py-16 space-y-8 border-l-4 border-white border-solid`}
                        >
                          <h1
                            className=${ow`font-bold cap-36-28 text-white opacity-90`}
                          >
                            Lorem ipsum dolor sit amet
                          </h1>
                          <h2
                            className=${ow`font-bold cap-24-32 text-white opacity-90`}
                          >
                            Onsectetur adipiscing elit sed.
                          </h2>
                          <p
                            className=${ow`cap-18-16 max-w-4xl text-white opacity-75`}
                          >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo.
                          </p>
                          <a
                            className=${ow`text-white block underline cap-24-0 pt-4`}
                            >Read the full article</a
                          >
                        </div>
                      </div>
                    </div>
                  `,
                }}
              />
            `
        )}
      </div>
    </main>
  `;
};

render(h(app), document.body);
