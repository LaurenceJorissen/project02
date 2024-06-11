import { c as create_ssr_component, a as add_classes, e as escape } from "../../chunks/ssr.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="mainContainer"><header${add_classes("".trim())}><h1 class="header" data-svelte-h="svelte-6mq31d">Artgallery</h1> <button data-svelte-h="svelte-dfflw7">Discovery page</button> <button data-svelte-h="svelte-1k5w58c">Saved images</button> <button data-svelte-h="svelte-156hnhw">My profile</button></header> <main class="${["mainContent", ""].join(" ").trim()}">${slots.default ? slots.default({}) : ``}</main> <footer${add_classes("".trim())}><div class="footer-content"><div class="contact-info"><p>© ${escape((/* @__PURE__ */ new Date()).getFullYear())} Artgallery. All rights reserved.</p> <p data-svelte-h="svelte-1p2z382">Contact: info@artgallery.com | Phone: +1234567890</p></div></div></footer></div>`;
});
export {
  Layout as default
};
