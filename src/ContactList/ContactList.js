import s from './ContactList.module.css'
import { v4 as uuidv4 } from 'uuid';

const ContactList = ({ contacts, onDeleteContact }) => (

    <ul className={s.ContactList__list}>
        {contacts.map(({ id, name, number }) => (
            <li
                key={uuidv4()}
                className={s.ContactList__list__item}>
                <p>{name}: {number}</p>
                <button
                    className={s.ContactList__delete__button}
                    onClick={() => onDeleteContact(id)}>
                    Delete
                </button>

            </li>
        ))}     
    </ul>
);

export default ContactList;