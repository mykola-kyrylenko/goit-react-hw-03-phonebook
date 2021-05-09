import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm'
import ContactList from './ContactList/ContactList'
import Filter from './Filter/Filter'
import s from './index.module.css'
// import { v4 as uuidv4 } from 'uuid';



class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
   
    filter: '',
    // name: '',
    // number: '',
    // id: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
      // console.log('refreshing contacts')
    }
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');

    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts){
      this.setState({ contacts: parsedContacts });
    }

  };



  deleteCoontact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contacts => contacts.id !== contactId)
    }));
  };

  handleAddContact = newContact => {
    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  handleCheckUniqueContact = (name) => {
    const { contacts } = this.state
    const isExistContact = !!contacts.find((contact) => contact.name === name)
    isExistContact && alert('Contact is already exist')

    return !isExistContact
   };
  
  handleChangeFilter = filter => {
    this.setState({ filter});
  };

   getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    // const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
   };
  
  render() {
    const {contacts, filter } = this.state
    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <div className={s.container}>
          <h1>Number Book</h1>
          <ContactForm
            contacts={contacts}
            // onSubmit={this.handleAddContact}
            onChange={this.handleInputChange}
            addContact={this.handleAddContact}
            onCheck={this.handleDuplicateContacts}
            uniqueName={this.handleCheckUniqueContact}         
          />
          <h2>Contacts</h2>
          <Filter
            filter={filter}
            onChange={this.handleChangeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteCoontact}
          />
        </div>
      </>
    );
  };
}

export default App;
