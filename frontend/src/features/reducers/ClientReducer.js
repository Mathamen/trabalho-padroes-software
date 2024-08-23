const initialState = {
    client: null,
  };
  
  const clientReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CLIENT':
        return { ...state, client: action.payload };
      case 'CLEAR_CLIENT':
        return { ...state, client: null };
      default:
        return state;
    }
  };
  
  export default clientReducer;
  