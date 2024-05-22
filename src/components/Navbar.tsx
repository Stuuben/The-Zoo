import { Link } from "react-router-dom";
import "./Navbar.scss";

export const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="zoo">
          <h1>Zoo</h1>
        </div>

        <ul>
          <li>
            <Link to="/">Hem</Link>
          </li>
          <li>
            <Link to="/animals">Djuren</Link>
          </li>
        </ul>
      </div>
    </>
  );
};
