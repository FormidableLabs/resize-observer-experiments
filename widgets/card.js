import lorem from 'https://unpkg.com/ipsums';
import { html, ow } from '../index.js';

export default {
  XS: (i) => html`
    <div
      className=${ow`bg-gray-600 w-full h-full flex`}
      style="background-image: url('${i.img}'), linear-gradient(to bottom, #333, #111); background-size: cover; background-blend-mode: overlay;"
    >
      <div
        className=${ow`space-y-3 p-10 bottom-0 opacity-75 transition duration-300 ease-in-out hover:opacity-100 relative z-1 mt-auto`}
      >
        <h1 className=${ow`font-bold cap-20-10 text-white opacity-90`}>
          ${lorem(2)}
        </h1>
        <div className=${ow`flex items-center space-x-2`}>
          <img className=${ow`w-6 -ml-1`} src="read-more.svg" />
          <a className=${ow`text-white block underline cap-12-0`}>Explore</a>
        </div>
      </div>
    </div>
  `,
  SM: (i) => html`
    <div
      className=${ow`bg-gray-600 w-full h-full flex`}
      style="background-image: url('${i.img}'), linear-gradient(to bottom, #333, #111); background-size: cover; background-blend-mode: overlay;"
    >
      <div
        className=${ow`space-y-6 p-16 bottom-0 opacity-75 transition duration-300 ease-in-out hover:opacity-100 relative z-1 mt-auto`}
      >
        <h1 className=${ow`font-bold cap-24-18 text-white opacity-90`}>
          ${lorem(4)}
        </h1>
        <p className=${ow`cap-13-14 max-w-4xl text-white opacity-75`}>
          ${lorem(10)}
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
    <div
      className=${ow`bg-gray-600 w-full h-full flex`}
      style="background-image: url('${i.img}'), linear-gradient(to bottom, #333, #111); background-size: cover; background-blend-mode: overlay;"
    >
      <div
        className=${ow`space-y-6 px-24 py-24 bottom-0 opacity-75 transition duration-300 ease-in-out hover:opacity-100 relative z-1 mt-auto`}
      >
        <h1 className=${ow`font-bold cap-28-20 text-white opacity-90`}>
          ${lorem(4)}
        </h1>
        <div className=${ow`w-10 border-1 border-white`}></div>
        <p className=${ow`cap-14-14 max-w-4xl text-white opacity-75`}>
          ${lorem(20)}
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
    <div
      className=${ow`bg-gray-600 w-full h-full flex`}
      style="background-image: url('${i.img}'), linear-gradient(to bottom, #333, #111); background-size: cover; background-blend-mode: overlay;"
    >
      <div
        className=${ow`space-y-8 px-24 py-24 bottom-0 opacity-75 transition duration-300 ease-in-out hover:opacity-100 relative z-1 mt-auto`}
      >
        <h1 className=${ow`font-bold cap-36-28 text-white opacity-90`}>
          ${lorem(4)}
        </h1>
        <h2 className=${ow`font-bold cap-24-32 text-white opacity-90`}>
          ${lorem(4)}
        </h2>
        <p className=${ow`cap-16-16 max-w-4xl text-white opacity-75`}>
          ${lorem(20)}
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
          <h1 className=${ow`font-bold cap-36-28 text-white opacity-90`}>
            ${lorem(6)}
          </h1>
          <h2 className=${ow`font-bold cap-24-32 text-white opacity-90`}>
            ${lorem(5)}
          </h2>
          <p className=${ow`cap-18-16 max-w-4xl text-white opacity-75`}>
            ${lorem(30)}
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
