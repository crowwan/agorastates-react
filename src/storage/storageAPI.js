import storage from "./storage.js";

export const storageAPI = {
  setInitialStorage() {
    const storageList = storage.getStorageList();
    storageList.map((a) => (!storage.getData(a) ? storage.setData(a, {}) : ""));
  },
};
