import logo from './logo.svg';
import './App.css';
// import mainpage from "./components/mainpagecomponent/MainPage";
import Mainpage from "./components/mainpagecomponent/MainPage";
import Signup from "./components/authcomponents/Signup";
import Login from "./components/authcomponents/Login";

import {
  BrowserRouter as Router,
  RouterProvider,
  Route,
  Routes,
  Link,
} from "react-router-dom";


function App() {
  return (
    <Router>
    <Routes>
      <Route path = '/programs' element = {<Mainpage/>} />
      <Route path = '/signup' element = {<Signup/>} />
      <Route path = '/login' element = {<Login/>} />
    </Routes>
    </Router>
  );
}

export default App;