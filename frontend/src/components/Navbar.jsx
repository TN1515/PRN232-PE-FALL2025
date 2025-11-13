import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🎬 Movie Watchlist
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/add" className="navbar-link navbar-link-add">
              + Add Movie
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
