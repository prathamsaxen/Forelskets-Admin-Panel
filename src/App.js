import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import { useState,useContext,useEffect} from "react";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Login from "./pages/login/Login";
import Settings from "./pages/settings/settings";
import Gallery from "./pages/gallery/Gallery";
import Team from "./pages/team/Team";
import News from "./pages/news/News";
import Contact from "./pages/contact/Contact";
import AuthenticationContext from "./context/AuthenticationContext";
import "./style/dark.scss";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [login,setLogin]=useState(false);

  useEffect(() => {
      const check = JSON.parse(localStorage.getItem("user"))?.email;
      if (check) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <AuthenticationContext.Provider value={{ login,setLogin }}>
      <BrowserRouter>
      {
        login?
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/team" element={<Team />} />
        <Route path='/news' element={<News />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/users" element={<List />} />
        <Route path="/users/:userId" element={<Single />} />
        <Route path="/users/new" element={<New title="Add New User" />}/>
      </Routes>
      :
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      }
       
      </BrowserRouter>
      </AuthenticationContext.Provider>
    </div>
  );
}

export default App;