import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Container from './Container';
import PhonebookForm from './PhonebookForm';
import PhonebookContacts from './PhonebookContacts';
import PhonebookFilter from './PhonebookFilter';
import filterContacts from '../utils/filterContacts';

function App() {
  const [contacts, setContacts] = useState(()=>
    JSON.parse(localStorage.getItem('contacts')) ?? []
  )
  const [filter, setFilter] = useState('');

  useEffect(() => {
    saveContactsToLocalStorage(contacts);
  }, [contacts]);

  const saveContactsToLocalStorage = updatedContacts => {
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const handleSubmit = contact => {
    const id = nanoid();
    const isContactExist = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isContactExist) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }

    const newContact = { ...contact, id };
    setContacts(prevContacts => {
      const updatedContacts = [...prevContacts, newContact];
      return updatedContacts;
    });
  };

  const handleDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== contactId)
    );
  };

  const handleChange = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const filteredContacts = filterContacts(contacts, filter);

  return (
    <Container>
      <h1>Phonebook</h1>
      <PhonebookForm onSubmit={handleSubmit}/>
      <h2>Contacts</h2>
      <PhonebookFilter filter={filter} handleChange={handleChange} />
      <PhonebookContacts
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </Container>
  );
}

export default App;