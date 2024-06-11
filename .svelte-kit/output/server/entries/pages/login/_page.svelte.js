import { c as create_ssr_component, d as add_attribute } from "../../../chunks/ssr.js";
import "../../../chunks/supabase.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let password = "";
  return `<div class="login-page"><div class="login-form">${`  <div class="container"><form><div class="form-group"><label for="email" data-svelte-h="svelte-1flf0h4">Email:</label> <input type="email" name="email" id="email" placeholder="Email"${add_attribute("value", email, 0)}></div> <div class="form-group"><label for="password" data-svelte-h="svelte-bhu94">Password:</label> <input type="password" name="password" id="password" placeholder="Password"${add_attribute("value", password, 0)}></div> ${``} <div class="form-group"><button type="submit" data-svelte-h="svelte-16nziak">Sign in</button></div> <div class="form-group" data-svelte-h="svelte-1kf3vmm"><p>Don&#39;t have an account yet? <a href="/signup">Sign up</a> here!</p></div> <span class="${["emoji", ""].join(" ").trim()}" data-svelte-h="svelte-1ovdn42">🧐</span></form></div>`}</div> <div class="image-container">${``}</div></div>`;
});
export {
  Page as default
};
