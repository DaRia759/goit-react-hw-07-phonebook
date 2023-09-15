import { useState } from "react";
import css from './Form.module.css';
import { toast } from 'react-toastify';
import { contactsOperations, contactsSelectors } from '../../redux/contacts'
import { useDispatch, useSelector } from "react-redux";


function Form() {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const dispatch = useDispatch();
    const contacts = useSelector(contactsSelectors.getContacts);
    // const isLoading = useSelector(contactsSelectors.getLoading);

    const handleChange = e => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'number') {
            setNumber(value);
        }
    };

    const handleFormSubmit = e => {
        e.preventDefault();
        if (contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase())
        ) {
            toast.error(`${name} is already in contacts`);
            return;
        } 
        dispatch(contactsOperations.addContact({ name, number }));
        toast.success(`${name} has been added to contacts`);
        reset();
    };

    const reset = () => {
        setName('');
        setNumber('');
    };

    return (
        <form className={css.form} onSubmit={handleFormSubmit}>
            <label className={css.label} htmlFor="name"><span className={css.span}>Name</span>
                <input
                    id="name" 
                    className={css.input}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash, and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    value={name}
                    onChange={handleChange}
                />
            </label>
            <label className={css.label} htmlFor="number"><span className={css.span}>Number</span>
                <input
                    id="number" 
                    className={css.inputNumber}
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses, and can start with +"
                    required
                    value={number}
                    onChange={handleChange}
                />
            </label>
            <button className={css.button} type="submit">Add contact</button>
        </form>
    );
};

export default Form;