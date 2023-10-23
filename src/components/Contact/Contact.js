import React, { useState } from 'react';
import css from './Contact.module.css';
import { BiSolidPencil, BiUserPin } from 'react-icons/bi';
import { BiSolidTrash } from 'react-icons/bi';
import { AiFillCheckCircle } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact, editContact } from 'redux/operations';

export default function Contact({ contact }) {
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState(false);
  const [oldName, setNewName] = useState(contact.name);
  const [oldPhone, setNewPhone] = useState(contact.phone);

  return (
    <div className={css.container}>
      <BiUserPin
        style={{ color: 'orange', width: '50px', height: '50px' }}
      ></BiUserPin>
      {inEditMode === false ? (
        <div className={css.infoMode}>
          <div className={css.info}>
            <span className={css.data}>{contact.name}</span>
            <span className={css.data}>{contact.phone}</span>
          </div>
          <div className={css.actions}>
            <BiSolidPencil
              onClick={() => {
                setInEditMode(true);
              }}
              style={{ color: 'orange', marginRight: '0px' }}
            ></BiSolidPencil>
            <BiSolidTrash
              onClick={() => {
                dispatch(deleteContact(contact.id));
              }}
              style={{ color: 'orange', marginRight: '15px' }}
            >
              Delete
            </BiSolidTrash>
          </div>
        </div>
      ) : (
        <>
          <form class={css.editForm}>
            <input
              type="text"
              name="editName"
              value={oldName}
              onChange={evt => {
                setNewName(evt.target.value);
              }}
            ></input>
            <input
              type="text"
              name="editPhone"
              value={oldPhone}
              onChange={evt => {
                setNewPhone(evt.target.value);
              }}
              class={css.lastInput}
            ></input>
          </form>
          <AiFillCheckCircle
            onClick={() => {
              setInEditMode(false);
              dispatch(
                editContact({
                  id: contact.id,
                  updatedContact: {
                    name: oldName,
                    phone: oldPhone,
                  },
                })
              );
            }}
            style={{ color: 'orange', marginRight: '15px' }}
          ></AiFillCheckCircle>
        </>
      )}
    </div>
  );
}

Contact.propTypes = {
  contact: PropTypes.exact({
    id: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    createdAt: PropTypes.string,
  }),
};
