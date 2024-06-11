import { c as create_ssr_component, e as escape, d as add_attribute, f as each } from "../../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const user = JSON.parse(data.user);
  const images = JSON.parse(data.images);
  let selectedImageInfo = "";
  let selectedImages = /* @__PURE__ */ new Set();
  let emailLink = "";
  const updateEmailLink = () => {
    let senderName = "User";
    if (typeof window !== "undefined" && localStorage.getItem("currenUserName")) {
      senderName = localStorage.getItem("currenUserName");
    }
    const subject = encodeURIComponent(`${senderName} is interested in your images`);
    const body = encodeURIComponent(`"Give here some extra details:"

 Selected images that I'm interested in:
${selectedImageInfo}
"Leave some extra contact information:"

Best regards,
${senderName}`);
    emailLink = `mailto:${user.email}?subject=${subject}&body=${body}`;
  };
  updateEmailLink();
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="profile"><div class="container"><div class="form-group"><h1 data-svelte-h="svelte-2fw6en">Contact Page</h1> <p>Send a mail to ${escape(user.name)}</p> <h2 data-svelte-h="svelte-1cii2yo">How to Send an Email</h2> <ol data-svelte-h="svelte-119rzv6"><li>Select the images you are interested in by clicking on them. Clicking twice would remove the image.</li> <li>Click on the email address link to open your email client. The selected image information will be pre-filled in the email subject and body.</li> <li>Ensure to complete the email and then send it.</li></ol></div> <p><a${add_attribute("href", emailLink, 0)}><i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i></a> <a${add_attribute("href", emailLink, 0)}>${escape(user.email)}</a></p> <div class="gallery-container"><h2 data-svelte-h="svelte-v4f8zz">User Images</h2>  ${each(images, (image) => {
    return ` <img class="img-contactpagina"${add_attribute("src", image.imageUrl, 0)}${add_attribute("alt", image.name, 0)} width="100" style="${"cursor: pointer; margin: 10px; border: " + escape(selectedImages.has(image.id) ? "2px solid blue" : "none", true)}">`;
  })}</div>  <form class="form-group"><label for="imageInfo" data-svelte-h="svelte-k6iao3">Selected Image Info:</label> <textarea class="textarea-contactpagina" id="imageInfo" rows="10" cols="120" readonly>${escape("")}</textarea></form> <form class="form-group"><button type="button" data-svelte-h="svelte-9i3u4w">Back to Profile</button></form></div></div>`;
});
export {
  Page as default
};
