import * as css from '../All.styled';
import { useDispatch, useSelector } from 'react-redux'
import { DeleteContacts } from '../../redux/contact/contactSlice';



export const ContactList = () => {
    const contacts = useSelector((state) => state.contact.contacts.items)
    const filterValue = useSelector((state) => state.contact.filter)
    const dispatch = useDispatch();

    const data = contacts.filter(contact => (
        contact.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
    ));

 

    return (
        <css.UlContactList>
            {data.map((contact) => (
                <li key={contact.id}>
                    {contact.name}: {contact.phone}
                    <button type='button' onClick={() => dispatch(DeleteContacts(contact.id))}>Delete</button>
                </li>))}
        </css.UlContactList>
    )

}


