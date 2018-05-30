export function logIn(authUser) {
  return {
    type: 'USER',
    payload: authUser
  }
}
export function fetchProfile(authUser) {
  return {
    type: 'PROFILE',
    payload: authUser
  }
}
