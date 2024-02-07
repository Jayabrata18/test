import { Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import Dashbord from "./components/dashbord";
function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Welcome/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/dashboard" element={<Dashbord/>}></Route>
        <Route path="/*" element={<div>404! Path Not Defined!</div>}></Route>
      </Routes>
    </div>
  );
}

export default App;
