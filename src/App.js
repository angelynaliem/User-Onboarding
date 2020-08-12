import React, { useState } from 'react';
import './App.css';
import Forms from './Components/Form';
import UsersList from './Components/UsersList';


function App() {

  //Creating initial state for users
  const [users, setUsers] = useState([])

  //Creating function to add new user and display the new list on the DOM
  const addNewUser = (user) => {
    setUsers([...users, {...user, id: Date.now() }])

  };


  return (
    <div className="App">
      <h1>User Onboarding</h1>
     <Forms addNewUser = {addNewUser}/>
     <UsersList users={users} />
    </div>
  );
}

export default App;
