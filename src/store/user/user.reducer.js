export const USER_ACTION_TYPES = {
  // We write the cases in an object so that we can access easily and also to avoid human errors
  SET_CURRENT_USER: "SET_CURRENT_USER",
};
//we need to give INITIAL_STATE to state as a initial state value because we are not using useReducer hook thats why we directly giving state manually
const INITIAL_STATE = {
  currentUser: null,
};
 export const userReducer = (state=INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state, //give me the same previous values of state
        currentUser: payload, // and then we will update only the property that we need to update
      };
      
    default:
      return state  //suppose if there is not switch type matched then we need to return the current  state because every single reducer receives every single action inside of redux so we might get actions where the type has nothing to do with our user reducer  it only has to do with our cart
  }
};