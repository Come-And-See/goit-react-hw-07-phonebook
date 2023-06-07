import React, { useState } from 'react';
import * as css from '../All.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useDispatch, useSelector } from 'react-redux'
import { GetContacts, PostContacts } from '../../redux/contact/contactSlice';

const ContactForm = () => {
    const contacts = useSelector((state) => state.contact.contacts.items)
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const addContact = () => {

        const contact = {
            name,
            phone,
        }

        if (name === '' || phone === '') {
            Notify.failure(`Enter the contact's name and phone number.`);
            return;
        }

        const onDuplicate = contacts.some(contact => contact.name === name);

        if (onDuplicate) {
            Notify.failure(`${name} is already in contacts.`);

        } else {
            dispatch(PostContacts(contact)).then(() => {
                dispatch(GetContacts());
            });
            setName('');
            setPhone('');
        }
    }


    return (
        <css.DivContactForm>
            <label htmlFor="name">
                Name
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    required
                />
            </label>
            <label htmlFor="number">Number
                <input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value) }}
                    required
                /></label>
            <button type='button' onClick={addContact}>Add contact</button>
        </css.DivContactForm>
    )


}



export default ContactForm;