import React from "react";

// The UsersList component maps through the 'users' data to display it as a list on the screen.

const UsersList = props => {
  return (
    <div>
      {props.users.map(user => (
        <div key={user.id}>
          <h2>Name: {user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Password: {user.password}</p>
          <p>Role: {user.role}</p>
          <p>Terms: {user.terms}</p>

        </div>
      ))}
    </div>
  );
};

export default UsersList;
