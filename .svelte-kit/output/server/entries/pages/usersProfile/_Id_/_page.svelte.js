import { c as create_ssr_component, e as escape, f as each, d as add_attribute } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const user = JSON.parse(data.user);
  const images = JSON.parse(data.images);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="profile"><div class="container">${user ? `<h1>${escape(user.name)}</h1> <form class="form-group"><button data-svelte-h="svelte-17ixisf">Contact Page</button></form> <h2 data-svelte-h="svelte-12wggl8">Images</h2> <div class="gallery"> ${each(images, (image) => {
    return ` <div class="image-item"><h3>${escape(image.name)}</h3> <img${add_attribute("src", image.imageUrl, 0)}${add_attribute("alt", image.name, 0)}> <h5>${escape(image.description)}</h5> </div>`;
  })}</div>` : `<p data-svelte-h="svelte-qdsr2u">Loading...</p>`} ${``}</div></div>`;
});
export {
  Page as default
};
