import React from 'react';
import SearchBar from './search-bar';

const SplashScreen = () =>
  <div>
    <div className="splash-screen">
      <div className="logo"><h1>Drajwer</h1></div>
      <p>Po polskich drogach codziennie jeździ 15mln kierowców. Wszyscy są tutaj.</p>
      <div className="icons">
        <div><img src="/src/wheel.png" /></div>
        <div><img src="/src/users.png" /></div>
        <div><img src="/src/comment.png" /></div>
      </div>
      <p>Po polskich drogach codziennie jeździ 15mln kierowców. Wszyscy są tutaj.</p>
      <p>Po polskich drogach codziennie jeździ 15mln kierowców. Wszyscy są tutaj.</p>
      <p>Publikuj, komentuj, oceniaj, rozmawiaj.</p>
    </div>
    <SearchBar />
  </div>
export default SplashScreen;
