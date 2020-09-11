import { html, ow, lorem } from '../index.js';
import useResizeObserver from '../useResizeObserver.js';

export const collection = () =>
  Array.from({ length: 12 }, () => {
    const title = lorem(8);
    return {
      id: Math.random().toString(36),
      img: `https://source.unsplash.com/collection/1103088/${
        (1000 + Math.random() * 100) << 0
      }x${(1000 + Math.random() * 100) << 0}`,
      shortTitle: title.split(' ').slice(0, 2).join(' '),
      title: title.split(' ').slice(0, 4).join(' '),
      longTitle: title,
      subTitle: lorem(5),
      shortDescription: lorem(10),
      description: lorem(20),
      longDescription: lorem(30),
      priority: [320, 480, 640, 768][(Math.random() * 3) << 0],
    };
  });

const bg = (i) =>
  `background-image: url('${i.img}'), linear-gradient(to bottom, #666, #333); background-size: cover; background-blend-mode: overlay;`;

const card = {
  XS: (i) => html`
    <div className=${ow`bg-gray-600 w-full h-full flex`} style="${bg(i)}">
      <div className=${ow`space-y-3 p-10 bottom-0 relative z-1 mt-auto`}>
        <h1 className=${ow`font-bold cap-20-10 text-white opacity-90`}>
          ${i.shortTitle}
        </h1>
        <div className=${ow`flex items-center space-x-2`}>
          <img className=${ow`w-6 -ml-1`} src="read-more.svg" />
          <a className=${ow`text-white block underline cap-12-0`}>Explore</a>
        </div>
      </div>
    </div>
  `,
  SM: (i) => html`
    <div className=${ow`bg-gray-600 w-full h-full flex`} style="${bg(i)}">
      <div className=${ow`space-y-6 p-16 bottom-0 relative z-1 mt-auto`}>
        <h1 className=${ow`font-bold cap-24-18 text-white opacity-90`}>
          ${i.title}
        </h1>
        <p className=${ow`cap-13-14 max-w-4xl text-white opacity-75`}>
          ${i.shortDescription}
        </p>
        <div className=${ow`flex items-center space-x-2`}>
          <img className=${ow`w-8 -ml-1`} src="read-more.svg" />
          <a className=${ow`text-white block underline cap-12-0`}
            >Find Out More</a
          >
        </div>
      </div>
    </div>
  `,
  MD: (i) => html`
    <div className=${ow`bg-gray-600 w-full h-full flex`} style="${bg(i)}">
      <div className=${ow`space-y-6 px-24 py-24 bottom-0 relative z-1 mt-auto`}>
        <h1 className=${ow`font-bold cap-28-20 text-white opacity-90`}>
          ${i.title}
        </h1>
        <div className=${ow`w-10 border-1 border-white`}></div>
        <p className=${ow`cap-14-14 max-w-4xl text-white opacity-75`}>
          ${i.description}
        </p>
        <div className=${ow`flex items-center space-x-2`}>
          <img className=${ow`w-8 -ml-1`} src="read-more.svg" />
          <a className=${ow`text-white block underline cap-14-0`}
            >Read The Article</a
          >
        </div>
      </div>
    </div>
  `,
  LG: (i) => html`
    <div className=${ow`bg-gray-600 w-full h-full flex`} style="${bg(i)}">
      <div className=${ow`space-y-8 px-24 py-24 bottom-0 relative z-1 mt-auto`}>
        <h1 className=${ow`font-bold cap-36-28 text-white opacity-90`}>
          ${i.title}
        </h1>
        <h2 className=${ow`font-bold cap-24-28 text-white opacity-90`}>
          ${i.subTitle}
        </h2>
        <p className=${ow`cap-16-16 max-w-4xl text-white opacity-75`}>
          ${i.description}
        </p>
        <div className=${ow`flex items-center space-x-2`}>
          <img className=${ow`w-8 -ml-1`} src="read-more.svg" />
          <a className=${ow`text-white block underline cap-14-0`}
            >Read The Article</a
          >
        </div>
      </div>
    </div>
  `,
  XL: (i) => html`
    <div className=${ow`bg-gray-600 w-full h-full flex`} style="${bg(i)}">
      <div className=${ow`px-24 py-24 bottom-0 relative z-1 mt-auto`}>
        <div
          className=${ow`pl-16 py-16 space-y-8 border-l-4 border-white border-solid`}
        >
          <h1 className=${ow`font-bold cap-36-28 text-white opacity-90`}>
            ${i.longTitle}
          </h1>
          <h2 className=${ow`font-bold cap-24-32 text-white opacity-90`}>
            ${i.subTitle}
          </h2>
          <p className=${ow`cap-18-16 max-w-4xl text-white opacity-75`}>
            ${i.longDescription}
          </p>
          <div className=${ow`flex items-center space-x-2`}>
            <img className=${ow`w-8 -ml-1`} src="read-more.svg" />
            <a className=${ow`text-white block underline cap-16-0`}
              >Continue Reading</a
            >
          </div>
        </div>
      </div>
    </div>
  `,
};

export const template = ({ data, focus }) => {
  const { ref, width } = useResizeObserver();

  let child;
  switch (true) {
    case width > 1024:
      child = card['XL'](data);
      break;
    case width > 768:
      child = card['LG'](data);
      break;
    case width > 640:
      child = card['MD'](data);
      break;
    case width > 480:
      child = card['SM'](data);
      break;
    default:
      child = card['XS'](data);
      break;
  }

  return html`
    <div
      className=${ow`
          relative
          flex-1
          flex
          flex-col
          items-start
          justify-start
          rounded-xl
          overflow-hidden
          hover:scale-102
          transition
          duration-150
          ease-in-out
          hover:cursor-pointer
          shadow-xl
          opacity-90
          hover:opacity-100
        `}
      style="flex:${data.priority}px;"
      ref=${ref}
      onClick=${(e) => focus(data.id)}
    >
      ${child}
    </div>
  `;
};
