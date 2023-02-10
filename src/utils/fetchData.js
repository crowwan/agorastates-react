const url = "http://localhost:4000";

const fetchData = (path) => fetch(`${url}/${path}`).then((res) => res.json());

const fetchDataWithQuery = (path, query) =>
  fetch(`${url}/${path}?${makeQueryString(query)}`).then((res) => res.json());

const fetchDataWithBody = (path, body) =>
  fetch(`${url}/${path}`, body).then((res) => res.text());

const makeQueryString = (obj) =>
  Object.entries(obj)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

export { fetchData, makeQueryString, fetchDataWithQuery, fetchDataWithBody };
