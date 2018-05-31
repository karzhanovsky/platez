import React from 'react';
import { auth } from '../firebase';

const LogoutForm = () =>
      <button
      className="logout-button"
      type="submit"
      onClick={auth.doSignOut}
      >
      Wyloguj
      </button>

export default LogoutForm;
