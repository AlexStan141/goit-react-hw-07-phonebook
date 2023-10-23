import React from 'react';
import Form from './Form/Form';
import ContactsList from './ContactsList/ContactsList';
import SearchFilter from './SearchFilter/SearchFilter';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { selectError, selectIsLoading } from 'redux/selectors';
import css from './App.module.css';

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <Form></Form>
      <h2 className={css.subtitle}>Contacts</h2>
      <SearchFilter></SearchFilter>
      {isLoading && !error && <b>Request in progress...</b>}
      <ContactsList></ContactsList>
    </div>
  );
}
