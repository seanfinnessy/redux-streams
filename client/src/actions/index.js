import { SIGN_IN, SIGN_OUT } from "./types";
import streams from "../apis/streams";
import history from '../history';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/streams", {...formValues, userId});

  dispatch({ type: "CREATE_STREAM", payload: response.data });
  // push is how we navigate a user arround
  history.push('/');
};

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");
  dispatch({ type: "FETCH_STREAMS", payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({ type: "FETCH_STREAM", payload: response.data });
};

// we changed from PUT to PATCH because PUT updated ALL properties in the stream (aka ended up deleting some bc we didnt send userId, only sent title and description). 
//PATCH updates only the properties that we want to update (title and description).
export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch({ type: "EDIT_STREAM", payload: response.data });
  history.push('/');
};

export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);
  dispatch({ type: "DELETE_STREAM", payload: id });
};
