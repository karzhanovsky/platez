import React from 'react';
import SearchBar from './search-bar';

const SplashScreen = () =>
  <div className="splash-screen">
    <div className="logo"><h1>Drajwer</h1></div>
    <p>Po polskich drogach codziennie jeździ 15mln kierowców. Wszyscy są tutaj.</p>
    <p>Publikuj, komentuj, oceniaj, rozmawiaj.</p>
    <SearchBar />
  </div>

export default SplashScreen;
