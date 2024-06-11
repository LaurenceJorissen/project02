import { c as create_ssr_component, b as subscribe, e as escape, f as each, d as add_attribute } from "../../../chunks/ssr.js";
import { w as writable } from "../../../chunks/index.js";
import "../../../chunks/supabase.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $likedImages, $$unsubscribe_likedImages;
  const likedImages = writable([]);
  $$unsubscribe_likedImages = subscribe(likedImages, (value) => $likedImages = value);
  let headerFontSize = 10;
  $$unsubscribe_likedImages();
  return `<div class="Saved-images"><div class="container"><h1 style="${"font-size: " + escape(headerFontSize, true) + "rem;"}">Saved images</h1> <div class="gallery">${each($likedImages, (image) => {
    return ` <div class="image-item"><h3>${escape(image[0])}</h3> <p>Uploaded by: ${escape(image[4])}</p> <img${add_attribute("src", image[2], 0)}${add_attribute("alt", image[0], 0)}> <p>${escape(image[1])}</p> </div>`;
  })}</div></div></div>`;
});
export {
  Page as default
};
