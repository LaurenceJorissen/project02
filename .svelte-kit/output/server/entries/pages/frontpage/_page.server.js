import { s as supabase } from "../../../chunks/supabase.js";
async function load() {
  const users = await supabase.from("users").select("*");
  const images = await supabase.from("images").select("*");
  return {
    users: JSON.stringify(users.data),
    images: JSON.stringify(images.data)
  };
}
export {
  load
};
