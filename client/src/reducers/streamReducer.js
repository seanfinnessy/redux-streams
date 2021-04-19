import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    // key interpolation syntax. [new key]: value. This way we can add a new key value pair on the fly!
    case "FETCH_STREAMS":
      // create an object out of the list that is returned from API. Keys inside obj are the id's.
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case "FETCH_STREAM":
      return { ...state, [action.payload.id]: action.payload };
    case "CREATE_STREAM":
      return { ...state, [action.payload.id]: action.payload };
    case "EDIT_STREAM":
      return { ...state, [action.payload.id]: action.payload };
    // creates new object without the action.payload.
    case "DELETE_STREAM":
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
