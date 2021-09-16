import React from 'react';
import User from './user';

const Users = ({users, ...rest}) => {
  return (
    <div className="container mt-3">
      {!!users.length &&
        <table className="table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Качества</th>
              <th>Проффессия</th>
              <th>Встретился, раз</th>
              <th>Оценка</th>
              <th>Избранное</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {users.map(user =>
            <User user={user} key={user._id} {...rest} />
            )}
          </tbody>
        </table>
      }
    </div>
  )
}

export default Users
