const user_state = {
  user: JSON.parse(localStorage.getItem("user")) || {},
};

const userReducer = (state = user_state, action) => {
  switch (action.type) {
    case "LOG_IN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        user: action.payload.user,
      };
    case "LOG_OUT":
      localStorage.removeItem("user");
      return {
        user: {},
      };
    case 'ADD_CART':
      localStorage.setItem('user', JSON.stringify(action.payload.data))
      return { user: user_state.user }
    default:
      return state;
  }
};

export default userReducer;
