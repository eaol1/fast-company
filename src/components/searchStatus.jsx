import React from 'react';

const SearchStatus = ({users, renderPhrase}) => {
  return (
    <span className={`badge p-3 bg-${users.length === 0 ? 'danger' : 'primary'}`}>
      {renderPhrase(users.length)} с тобой сегодня
    </span>
  );
}

export default SearchStatus;
