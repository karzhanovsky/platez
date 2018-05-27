import { db } from '../firebase';

export function logIn(authUser) {
  return {
    type: 'USER',
    payload: authUser
  };
}

/*export function fetchProfile(plate) {
  return dispatch => {
    db.ref(`/plates/${plate}`).on('value', snapshot => {
      if (!snapshot.exists()) {
        dispatch({
          type: 'NO_PROFILE',
          payload: "No profile yet"
        });
      } else {
        dispatch({
          type: 'PROFILE',
          payload: snapshot.val()
        });
      }
    });
  }
}

export function fetchComments(plate) {
  return dispatch => {
    db.ref(`/plates/${plate}`).on('value', snapshot => {
      if (!snapshot.exists()) {
        dispatch({
          type: 'NO_PROFILE',
          payload: "No profile yet"
        });
      } else {
        dispatch({
          type: 'PROFILE',
          payload: snapshot.val()
        });
      }
    });
  }
}
*/
