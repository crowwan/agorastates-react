export default (function () {
  const storageList = ["user"];

  return {
    getStorageList() {
      return [...storageList];
    },
    getData(key) {
      if (localStorage.getItem(key))
        return JSON.parse(localStorage.getItem(key));
      return null;
    },
    setData(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    },
  };
})();
