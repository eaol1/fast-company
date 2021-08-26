import React from 'react';

export default function DataTables({users, handleDelete}) {
  return(
    <table className="table">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Качества</th>
          <th>Проффессия</th>
          <th>Встретился, раз</th>
          <th>Оценка</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {users.map(user =>
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>
          {user.qualities.map(quality => 
            <span 
              key={quality._id}
              className={`badge bg-${quality.color} me-2`}
            >
              {quality.name}
            </span>
          )}
          </td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate}</td>
          <td><button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button></td>
        </tr>
        )}
      </tbody>
    </table>
  )
}
