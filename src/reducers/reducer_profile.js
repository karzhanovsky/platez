export default function(state={}, action) {
  switch (action.type) {
    case 'PROFILE':
      return action.payload
    default: return state;
  }
}
