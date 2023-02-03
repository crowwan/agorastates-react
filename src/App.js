import { useEffect } from "react";
import Header from "./layouts/Header";
import Aside from "./layouts/Aside";
import { storageAPI } from "./storage/storageAPI";
function App() {
  useEffect(() => {
    storageAPI.setInitialStorage();
  }, []);
  return (
    <div className="App">
      <div id="wrapper">
        <div className="container">
          <Header />
          <Aside disabled={true} />
        </div>
      </div>
    </div>
  );
}

export default App;
