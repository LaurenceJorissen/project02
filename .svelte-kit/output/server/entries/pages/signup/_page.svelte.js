import { c as create_ssr_component, d as add_attribute } from "../../../chunks/ssr.js";
import "../../../chunks/supabase.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let password = "";
  let username = "";
  return `<div class="signup-page"><div class="signup-form"><div class="container"><form><div class="form-group"><label><input type="radio" value="email"${add_attribute("checked", true, 1)}>
                        Sign up with Email</label> <label><input type="radio" value="phone"${""}>
                        Sign up with Phone</label></div> ${`<div class="form-group"><label for="email" data-svelte-h="svelte-1flf0h4">Email:</label> <input type="email" name="email" id="email" placeholder="Email"${add_attribute("value", email, 0)}></div>`} ${``} <div class="form-group"><label for="username" data-svelte-h="svelte-1c8yrdk">Username:</label> <input type="text" name="username" id="username" placeholder="Username"${add_attribute("value", username, 0)}></div> <div class="form-group"><label for="password" data-svelte-h="svelte-bhu94">Password:</label> <input type="password" name="password" id="password" placeholder="Password"${add_attribute("value", password, 0)}></div> <div class="form-group" data-svelte-h="svelte-1sbv9qn"><button type="submit">Sign up</button></div> <div class="form-group" data-svelte-h="svelte-373jwr"><a href="/login">Go back</a></div></form></div></div></div>`;
});
export {
  Page as default
};
