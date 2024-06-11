import { c as create_ssr_component, d as add_attribute } from "../../chunks/ssr.js";
import "../../chunks/supabase.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let password = "";
  return `${`<div class="container"><form><div class="form-group"><label for="email" data-svelte-h="svelte-1flf0h4">Email:</label> <input type="email" name="email" id="email" placeholder="Email"${add_attribute("value", email, 0)}></div> <div class="form-group"><label for="password" data-svelte-h="svelte-bhu94">Password:</label> <input type="password" name="password" id="password" placeholder="Password"${add_attribute("value", password, 0)}></div> <button type="submit" data-svelte-h="svelte-13remx3">Sign in</button></form> <p data-svelte-h="svelte-nvjowy">Don&#39;t have an account yet? <a href="/signup">Sign up</a> here!</p></div>`}`;
});
export {
  Page as default
};
