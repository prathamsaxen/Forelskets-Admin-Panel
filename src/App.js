import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext,useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useState } from "react";
import AuthenticationContext from "./context/AuthenticationContext";

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
        <Route path="/users" element={<List />} />
        <Route path="/users/:userId" element={<Single />} />
        <Route path="/users/new" element={<New inputs={userInputs} title="Add New User" />}/>
        <Route path="/products" element={<List />} />
        <Route path="/products/:productId" element={<Single />} />
        <Route path="/products/new" element={<New inputs={productInputs} title="Add New Product" />}/>
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
