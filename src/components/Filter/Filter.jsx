import { contactsActions, contactsSelectors } from '../../redux/contacts';
import { useDispatch, useSelector } from 'react-redux';
import css from './Filter.module.css';

function Filter() {
  const filter = useSelector(contactsSelectors.getFilter);
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getContacts);
  const error = useSelector(contactsSelectors.getError);

  const handleFilterChange = (e) => {
    const { value } = e.target;
    dispatch(contactsActions.filterContacts(value));
  };

  return (
    <>
      {contacts.length > 0 && !error && (
        <label className={css.findZone}>
        Find contacts by name
          <input
            placeholder='Search...'
            type="text"
            value={filter}
            onChange={handleFilterChange}
            className={css.input}
          />
        </label>
      )}

    </>
  );
};

export default Filter;