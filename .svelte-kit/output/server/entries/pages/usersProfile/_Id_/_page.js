async function load({ params, data }) {
  return {
    userId: params.id,
    user: data.user,
    images: data.images
  };
}
export {
  load
};
