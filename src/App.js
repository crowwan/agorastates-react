import { useEffect, useState } from "react";
import Header from "./layouts/Header";
import Main from "./layouts/Main";
import { storageAPI } from "./storage/storageAPI.js";
function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    storageAPI.setInitialStorage();
  }, []);
  return (
    <div className="App">
      <div id="wrapper">
        <div className="container">
          <Header user={user} setUser={setUser} />
          <Main user={user} />
        </div>
      </div>
    </div>
  );
}

export default App;
