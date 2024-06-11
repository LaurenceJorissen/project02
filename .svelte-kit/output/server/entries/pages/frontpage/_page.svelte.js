import { c as create_ssr_component, e as escape, f as each, d as add_attribute } from "../../../chunks/ssr.js";
let headerFontSize = 10;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const users = JSON.parse(data.users);
  let images = JSON.parse(data.images);
  let filteredImages = images;
  const findUserName = (userId) => {
    const user = users.find((user2) => user2.id === userId);
    return user ? user.name : "Unknown User";
  };
  let isLiked = {};
  let enlargedImageId = null;
  let enlargedImageStyle = "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="front-page"><div class="container"><h1 style="${"font-size: " + escape(headerFontSize, true) + "rem;"}">Discovery page</h1> <div class="search"><form class="form-group"><input type="text" placeholder="Search by user name or image name"></form></div> <div class="gallery">${each(filteredImages, (image) => {
    return ` <div class="${"image-item " + escape(enlargedImageId === image.imageUrl ? "enlarged" : "", true)}"${add_attribute(
      "style",
      enlargedImageId === image.imageUrl ? enlargedImageStyle : "",
      0
    )}><h3>${escape(image.name)}</h3> <p>Uploaded by: ${escape(findUserName(image.userId))}</p>   <img${add_attribute("src", image.imageUrl, 0)}${add_attribute("alt", image.name, 0)}> <p>${escape(image.description)}</p>   <span class="heart-icon" style="${"color: " + escape(
      isLiked[`${image.userId}_${image.imageUrl}`] ? "#4a3f35" : "#ccc",
      true
    )}">❤</span> </div>`;
  })}</div> ${``}</div></div>`;
});
export {
  Page as default
};
