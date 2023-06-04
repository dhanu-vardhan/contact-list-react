import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    axios.get('https://api.example.com/contacts') // Replace with your API endpoint
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const searchContacts = event => {
    setSearchText(event.target.value);
  };

  const filteredContacts = contacts.filter(contact => {
    const { name, number } = contact;
    return name.toLowerCase().includes(searchText.toLowerCase()) || number.includes(searchText);
  });

  return (
    <div style={{ padding: '16px' }}>
      <input
        type="text"
        placeholder="Search contacts"
        value={searchText}
        onChange={searchContacts}
        style={{ marginBottom: '16px', padding: '8px', borderColor: '#ccc', borderWidth: '1px' }}
      />
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {filteredContacts.map((contact, index) => (
          <li key={index} style={{ padding: '16px', borderBottom: '1px solid #ccc' }}>
            <div style={{ fontSize: '16px' }}>{contact.name}</div>
            <div>{contact.number}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ContactList />
    </div>
  );
};

export default App;
