import { c as create_ssr_component } from "../../../chunks/ssr.js";
import "../../../chunks/supabase.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let images = [];
  let searchTerm = "";
  images.filter((image) => image.name.toLowerCase().includes(searchTerm.toLowerCase()));
  return `<div class="profile">${``}</div>`;
});
export {
  Page as default
};
