import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
} from "./authTypes";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

// Function to set user authentication status in localStorage
const setAuthStatusInLocalStorage = (status) => {
  localStorage.setItem("isAuthenticated", JSON.stringify(status));
};

// Function to get user authentication status from localStorage
const getAuthStatusFromLocalStorage = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated ? JSON.parse(isAuthenticated) : false;
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    const data = await createUserWithEmailAndPassword(auth, email, password);
    console.log(data);

    const user = data?.user;

    await updateProfile(user, {
      displayName: name,
    });

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: user,
    });
    setAuthStatusInLocalStorage(true); // Set user as authenticated in localStorage
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error?.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const data = await signInWithEmailAndPassword(auth, email, password);

    dispatch({ type: LOGIN_SUCCESS, payload: data?.user });
    setAuthStatusInLocalStorage(true); // Set user as authenticated in localStorage
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error?.message });
  }
};

export const loginWithGoogle = () => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const googleAuthProvider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth, googleAuthProvider);

    dispatch({ type: LOGIN_SUCCESS, payload: data?.user });
    setAuthStatusInLocalStorage(true);
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error?.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch({ type: LOGOUT_SUCCESS });
    setAuthStatusInLocalStorage(false); // Set user as not authenticated in localStorage
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error?.message });
  }
};
//load user

// Assuming you have AUTH constants defined for request, success, and fail actions

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    await onAuthStateChanged(auth, async (currentuser) => {
      if (currentuser) {
        dispatch({ type: LOAD_USER_SUCCESS, payload: currentuser });
        setAuthStatusInLocalStorage(true); // Set user as authenticated in localStorage
      }
    });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: LOAD_USER_FAIL, payload: error?.message });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

// Export a function to check user authentication status in localStorage
export const checkAuthStatus = () => {
  const isAuthenticated = getAuthStatusFromLocalStorage();
  return isAuthenticated;
};
