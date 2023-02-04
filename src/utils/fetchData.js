const url = "http://localhost:4000";

const fetchData = (path, query) =>
  makeQueryString(query)
    ? fetch(`${url}/${path}?${makeQueryString(query)}`).then((res) =>
        res.json()
      )
    : fetch(`${url}/${path}`).then((res) => res.json());

const makeQueryString = (obj) => {
  return Object.entries(obj)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
};

export { fetchData, makeQueryString };
