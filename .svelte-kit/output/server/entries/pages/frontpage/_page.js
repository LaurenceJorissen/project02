async function load({ data }) {
  return {
    users: data.users,
    images: data.images
  };
}
export {
  load
};
