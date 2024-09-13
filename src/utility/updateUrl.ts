const update_url = (url: string) => {
  history.replaceState(null, "", url);
};

export default update_url;
