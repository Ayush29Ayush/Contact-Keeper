//! Why not just pass strings to reducer, rather than importing it as a variable from the "type" folder? What's the benefit?
// The short answer would be less likelihood of errors.
//Say you have multiple components that dispatch a 'SOME_ACTION' and in every component you type out dispatch({ 'SOME_ACTION', payload }) So using a string literal every time.
//The one time you make a typo and type dispatch({ 'SOME_ACTON', payload }) could be a tricky error to track down, especially as we are not logging dispatches anywhere in our app.
//By using a types module we are declaring our types once in one file/module and then importing the exact same type wherever we need it in our app. This ensures there is no risk of a typo in a string. Obviously if you get a typo in your code for importing or using a variable you get a nice big warning right there in your editor telling you.

//! For Frontend part
export const ADD_CONTACT = "ADD_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const SET_CURRENT = "SET_CURRENT";
export const CLEAR_CURRENT = "CLEAR_CURRENT";
export const UPDATE_CONTACT = "UPDATE_CONTACT";
export const FILTER_CONTACTS = "FILTER_CONTACTS";
export const CLEAR_FILTER = "CLEAR_FILTER";
export const CONTACT_ERROR = "CONTACT_ERROR";
export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";

// -----------------------------------

//! For integration with backend part
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
