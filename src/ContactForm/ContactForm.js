import {Component} from 'react'
import { v4 as uuidv4 } from 'uuid';

import s from './ContactForm.module.css'

const INITIAL_STATE = {
    name: '',
    number: ''
};

class ContactForm extends Component {
    state = { ...INITIAL_STATE };

    handleChange = e => {
        const { name, value } = e.currentTarget;

        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { name, number } = this.state
        const { addContact } = this.props
        
        const isValidated = this.validator()
        if (!isValidated) return

        console.log(`
        name: ${name}
        number: ${number}
        `);

        addContact({ id: uuidv4(), name, number })
        
        // this.props.onSubmit({ ...this.state });
        this.reset();
    };

    validator = () => {
        const { name, number } = this.state
        const { uniqueName } = this.props
        
        if (!name || !number) {
            alert('Не все поля заполнен')
            return false
        }

        return uniqueName(name)
    };


  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };
 
    render() {
        const { name, number} = this.state;

        return (
            <div>
                <form
                    onSubmit={this.handleSubmit}
                    className={s.ContactForm__container}
                    // onCheckUnique={this.uniqueName}
                >
                    <p>Name</p>
                    <label htmlFor="">
                        <input
                            type="text"
                            className={s.ContactForm__input}
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                            required
                            value={name}
                            onChange={this.handleChange}
                            
                            // id={uuidv4()}
                        />
                    </label>
        
                    <p>Number</p>
                    <label htmlFor="">
                        <input
                            type="tel"
                            className={s.ContactForm__input}
                            name="number"
                            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
                            title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
                            required
                            value={number}
                            onChange={this.handleChange}
                            // id={uuidv4()}
                        />
                    </label>
      
                    <button
                        type="submit"
                        className={s.ContactList__add__button}
                    >Add contact</button>
                </form>
            </div>
        );
    };
}

export default ContactForm;