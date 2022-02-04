import React from 'react';
import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../models/db';

export function AddTodoList() {
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState('');
  const hasAnyList = useLiveQuery(async () => {
    const listCount = await db.todoLists.count();
    return listCount > 0;
  });

  return !isActive ? (
    <button className="large-button" onClick={() => setIsActive(!isActive)}>
      {' '}
      {hasAnyList ? 'Add another list' : 'Create ToDo List'}
    </button>
  ) : (
    <div className="box">
      <h2>Give your list a name:</h2>
      <div className="todo-item-input">
        <input
          type="text"
          autoFocus
          placeholder="Name of list..."
          value={title}
          onChange={ev => setTitle(ev.target.value)}
          onKeyUp={ev => {
            if (ev.key === 'Enter') {
              db.todoLists.add({ title });
              setTitle('');
              setIsActive(false);
            }
          }}
        />
      </div>
    </div>
  );
}
