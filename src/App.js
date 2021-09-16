import React, { useState } from 'react';

import api from './api';
import SearchStatus from './components/searchStatus';
import Users from './components/users';
const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(prev => prev.filter(u => u._id !== userId));
  }
  
  const renderPhrase = (number) => {
    const phrase = number > 1 && number < 5 ? 'а тусанут' : number > 0 ? ' тусанет' : '';
    return number === 0 ? 'Никто не тусанет' : users.length + ' человек' + phrase;
  }

  const handleToggleBookMark = (id) => {
    setUsers(
      users.filter((user) => {
        if (user._id === id) {
          user.bookmark = !user.bookmark;
          return user;
        }
        return user;
      })
    );
  };

  return (
    <div className="container mt-3">
      <SearchStatus users={users} renderPhrase={renderPhrase} />
      {!!users.length &&
        <Users users={users} handleDelete={handleDelete} onToggleBookMark={handleToggleBookMark} />
      }
    </div>
  );
}

export default App;
