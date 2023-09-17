import { createReducer, combineReducers } from "@reduxjs/toolkit";
import {
    fetchContactsRequest,
    fetchContactsSuccess,
    fetchContactsError,
    addContactRequest,
    addContactSuccess,
    addContactError,
    deleteContactRequest,
    deleteContactSuccess,
    deleteContactError,
    filterContacts,
} from './contacts-action';

const contacts = createReducer([], {
    [fetchContactsSuccess]: (_, { payload }) => payload,
    [addContactSuccess]: (state, { payload }) => [...state, payload],
    [deleteContactSuccess]: (state, { payload }) =>
        state.filter(({ contactId }) => contactId !== payload),
});

// const isLoading = createReducer(false, {
//     [fetchContactsRequest]: () => true,
//     [fetchContactsSuccess]: () => false,
//     [fetchContactsError]: () => false,
//     [addContactRequest]: () => true,
//     [addContactSuccess]: () => false,
//     [addContactError]: () => false,
//     [deleteContactRequest]: () => true,
//     [deleteContactSuccess]: () => false,
//     [deleteContactError]: () => false,
// });

const filter = createReducer('', {
    [filterContacts]: (_, { payload }) => payload,
});

const error = createReducer(null, {
    [fetchContactsError]: (_, { payload }) => payload,
    [addContactError]: (_, { payload }) => payload,
    [deleteContactError]: (_, { payload }) => payload,
    [fetchContactsRequest]: () => null,
    [addContactRequest]: () => null,
    [deleteContactRequest]: () => null,
});

export default combineReducers({
    contacts,
    filter,
    // isLoading,
    error,
});