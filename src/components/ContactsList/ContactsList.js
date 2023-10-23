import React from 'react';
import css from './ContactsList.module.css';
import Contact from 'components/Contact/Contact';
import { useSelector } from 'react-redux';
import { selectMatchingContacts } from 'redux/selectors';

export default function ContactsList() {
  const contacts = useSelector(selectMatchingContacts);

  return (
    <ul className={css.list}>
      {contacts.map((contact, index) => {
        return <Contact contact={contact} key={index}></Contact>;
      })}
    </ul>
  );
}
