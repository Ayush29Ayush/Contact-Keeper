import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Sample contact 1",
        email: "sample1@gmail.com",
        phone: "111-111-1111",
        type: "personal",
      },
      {
        id: 2,
        name: "Sample contact 2",
        email: "sample2@gmail.com",
        phone: "222-222-2222",
        type: "personal",
      },
      {
        id: 3,
        name: "Sample contact 3",
        email: "sample3@gmail.com",
        phone: "333-333-3333",
        type: "professional",
      },
    ],
    // Whenever we click edit in UI , object will be put into this "current" state and we can change things in the UI based on that.
    current: null
  };
  //! State allows us to access anything in our state.
  //! Dispatch allows us to dispatch objects to the reducer.
  const [state, dispatch] = useReducer(contactReducer, initialState);

  //! Actions to be added , will become a CRUD app
  // Add Contact
  const addContact = (contact) => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete Contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update Contact

  // Filter Contact

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
