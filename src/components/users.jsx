import React, { useState } from 'react';

import api from '../api';
import Table from './table';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(prev => prev.filter(u => u._id !== userId));
  }

  const renderPhrase = (number) => {
    const phrase = number > 1 && number < 5 ? 'а тусанут' : number > 0 ? ' тусанет' : '';
    return number === 0 ? 'Никто не тусанет' : users.length + ' человек' + phrase;
  }

  return (
    <div className="container mt-3">
      <span className={`badge p-3 bg-${users.length === 0 ? 'danger' : 'primary'}`}>
        {renderPhrase(users.length)} с тобой сегодня
      </span>
      {!!users.length &&
        <Table users={users} handleDelete={handleDelete} />
      }
    </div>
  )
}

export default Users

