import { s as supabase } from "../../../../../chunks/supabase.js";
async function load({ params }) {
  const userId = params.Id;
  if (!userId) {
    return {
      error: "No user ID provided"
    };
  }
  const { data: user, error: userError } = await supabase.from("users").select("id, name, email, savedImages").eq("id", userId).single();
  if (userError) {
    console.error("Error fetching user profile:", userError);
    return {
      error: "Error fetching user profile"
    };
  }
  const { data: images, error: imagesError } = await supabase.from("images").select("id, name, imageUrl, description").eq("userId", userId);
  if (imagesError) {
    console.error("Error fetching user images:", imagesError);
    return {
      error: "Error fetching user images"
    };
  }
  return {
    user: JSON.stringify(user),
    images: JSON.stringify(images)
  };
}
export {
  load
};
