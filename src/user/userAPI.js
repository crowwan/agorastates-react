import storage from "../storage/storage.js";
import SHA256 from "../utils/hash.js";

export const userAPI = {
  signUp(userId, userPw) {
    const userData = storage.getData("user");

    if (userData[userId]) {
      alert("아이디가 존재합니다.");
      return false;
    }

    userData[userId] = {
      id: userId,
      pw: SHA256(userPw),
      url: "./asset/user.png",
    };
    storage.setData("user", userData);
    // user.setCurrentUser(userId);
    // user.notifyAll();
    return true;
  },

  signIn(userId, userPw) {
    const userData = storage.getData("user");
    console.log(userId, userPw);

    // 조건식 수정 함수 이용
    if (
      userData[userId] &&
      passwordMatch(userData[userId].pw, SHA256(userPw))
    ) {
      // user.setCurrentUser(userId);
      // user.notifyAll();
      return true;
    } else if (!userData[userId]) alert("아이디가 존재하지 않습니다.");
    else if (!passwordMatch(userData[userId], SHA256(userPw)))
      alert("비밀번호가 틀렸습니다.");

    return false;
  },
  logOut() {
    // user.setCurrentUser("");
    // user.notifyAll();
  },
};

function passwordMatch(pw1, pw2) {
  return pw1 === pw2;
}
