import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () =>
  <div className="navigation">
    <ul>
      <li>
        <Link className="navi-link" to={"/"}>
        Szukaj
        </Link>
      </li>
      <li>
        <Link className="navi-link" to={"/konto"}>
        Konto
        </Link>
      </li>
      <li>
        <Link className="navi-link" to={"/"}>
        Navigation 1
        </Link>
      </li>
      <li>
        <Link className="navi-link" to={"/"}>
        Navigation 2
        </Link>
      </li>
    </ul>
  </div>

export default Navigation;
