import { Navbar } from "../components/Navbar";
import "./Home.scss";
import "../components/Navbar.scss";
import { Animals } from "./Animals";

export const Home = () => {
  return (
    <div className="home">
      <h1>Välkommen till Zoo!</h1>
      <div className="bgimg"></div>
    </div>
  );
};
