import { render, h } from 'https://unpkg.com/preact@latest?module';
import { useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

import ipsum from 'https://unpkg.com/ipsums';
export const lorem = ipsum;

import htm from 'https://unpkg.com/htm?module';
export const html = htm.bind(h);

import { themed } from 'https://unpkg.com/oceanwind/index.min.js';
export const ow = themed({
  scale: {
    102: '1.02',
  },
});

import * as Card from './widgets/card.js';
import Article from './widgets/article.js';

const app = () => {
  const [widgets, setWidgets] = useState(Card.collection());
  const [focus, setFocus] = useState(null);
  const [search, setSearch] = useState('');

  const aside = widgets.find((x) => x.id === focus) || {};

  return html`
    <main className=${ow`flex h-screen bg-gray-300`}>
      <section className=${ow`h-screen overflow-auto w-full px-10`}>
        <nav className=${ow`w-full flex-none p-10 pb-0 flex space-x-8`}>
          <input
            className=${ow`w-full p-6 text-3xl bg-gray-400 rounded-full pl-10 placeholder-gray-600 border-solid border-4 border-gray-500`}
            placeholder="Search for articles.."
            onInput=${(e) => setSearch(e.target.value)}
          />
          <button
            className=${ow`px-16 rounded-full bg-gray-600 text-2xl font-bold text-gray-400`}
            onClick=${(e) =>
              setWidgets([...widgets].sort((x) => 0.5 - Math.random()))}
          >
            SHUFFLE
          </button>
        </nav>
        <div
          className=${ow`m-auto flex flex-wrap items-stretch pt-10 pl-10 rounded-2xl`}
        >
          ${widgets
            .filter((x) =>
              x.longTitle.toLowerCase().match(search.toLowerCase())
            )
            .map(
              (data) =>
                html`<${Card.template}
                  key=${data.id}
                  data=${data}
                  focus=${setFocus}
                />`
            )}
        </div>
      </section>
      <aside
        className=${ow`relative flex-shrink-0 bg-gray-200 w-full transition-all duration-300 ease-in-out`}
        style="max-width: ${focus ? '38%' : '0%'}"
      >
        <div
          className=${ow`absolute inset-0 h-screen overflow-y-auto transition-all duration-500 ease-in-out`}
          style="opacity: ${focus ? '1' : '0'}"
        >
          <${Article} key=${focus} data=${aside} />
          <button
            onClick=${(e) => setFocus(null)}
            className=${ow`absolute top-0 right-0 p-8 opacity-75`}
          >
            <svg
              className=${ow`w-32`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
              />
            </svg>
          </button>
        </div>
      </aside>
    </main>
  `;
};

render(h(app), document.body);
