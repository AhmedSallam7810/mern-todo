const initialState = {
    token: "",
    data: "",
  };
  
  const usetoken = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...state,
          token: action.payload.token,
          data: action.payload.data,
        };
      case "LOGOUT":
        return { ...state, token: "", data: "" };
      default:
        return state;
    }
  };
  
  export default usetoken ;