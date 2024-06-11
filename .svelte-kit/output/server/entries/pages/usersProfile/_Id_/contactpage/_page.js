async function load({ params, data, session }) {
  return {
    userId: params.id,
    user: data.user,
    images: data.images
  };
}
export {
  load
};
