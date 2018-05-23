import React from 'react';
import { auth } from '../firebase';

const LogoutForm = () =>
      <button
      type="submit"
      onClick={auth.doSignOut}
      >
      Logout
      </button>

export default LogoutForm;
