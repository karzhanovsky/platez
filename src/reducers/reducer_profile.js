export default function(state={}, action) {
  switch (action.type) {
    case 'PROFILE':
      return action.payload;
  }
  return state;
}
