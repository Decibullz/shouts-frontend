import {
  SET_SHOUTS,
  LOADING_DATA,
  POST_SHOUT,
  DELETE_SHOUT,
  LIKE_SHOUT,
  UNLIKE_SHOUT,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
} from "../types";
import axios from "axios";

// get all shouts
export const getShouts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/shouts")
    .then((res) => {
      dispatch({
        type: SET_SHOUTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SHOUTS,
        payload: [],
      });
    });
};
// Post a Shout!
export const postShout = (newShout) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/shout", newShout)
    .then((res) => {
      dispatch({
        type: POST_SHOUT,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Like a shout
export const likeShout = (shoutId) => (dispatch) => {
  axios
    .get(`/shout/${shoutId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SHOUT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// unlike a shout
export const unlikeShout = (shoutId) => (dispatch) => {
  axios
    .get(`/shout/${shoutId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SHOUT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteShout = (shoutId) => (dispatch) => {
  axios
    .delete(`/shout/${shoutId}`)
    .then(() => {
      dispatch({ type: DELETE_SHOUT, payload: shoutId });
    })
    .catch((err) => console.log(err));
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
