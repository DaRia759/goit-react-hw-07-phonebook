import { useEffect } from 'react';
import { contactsSelectors } from '../../redux/contacts';
import css from './ContactItem.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/utils/contacts-api';
import { deleteContact } from 'redux/utils/contacts-api';

function ContactItem() {
  const contacts = useSelector(contactsSelectors.getContacts);
  const visibleContacts = useSelector(contactsSelectors.getVisibleContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div>
      {contacts.length > 0 ? (
        <ul>
          {visibleContacts.map((contact) => (
            <li key={contact.contactId} className={css.contact}>
              {contact.name}: {contact.number}{' '}
              <button
                type='button'
                onClick={() => handleDeleteContact(contact.contactId)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no contacts in your phonebook</p>
      )}
    </div>
  );
}

export default ContactItem;
