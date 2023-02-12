export const user = (() => {
  let currentUser = "";
  // let observers = [];
  return {
    // getSubscribers() {
    //   return observers;
    // },
    // subscribe(component) {
    //   observers.push(component);
    // },
    // unSubscribe(component) {
    //   observers = observers.filter((a) => a !== component);
    // },
    // notifyAll() {
    //   observers.map((a) => a.setState({ userId: currentUser }));
    // },
    getCurrentUser() {
      return currentUser;
    },
    setCurrentUser(userId) {
      currentUser = userId;
    },
  };
})();
