import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img
          src="https://th.bing.com/th?id=OIP.P2QYmHymKBJH_BPhsg7yTgAAAA&w=187&h=169&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
          alt="Logo"
          className="navbar-logo"
        />
        <h1 className="navbar-heading">Crispy CookBook</h1>
      </div>
      <ul className="navbar-right">
        <li>
          <Link to="/health-recipes">Healthy Recipes</Link>
        </li>
        <li>
          <Link to="/fast-foods">Fast Food</Link> {/* Fast Food Link */}
        </li>
        <li>
          <Link to="/add">Recipe +</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
