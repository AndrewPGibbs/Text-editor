import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const todosDb = await openDB('todos', 1);
  const tx = todosDb.transaction('todos', 'readwrite');
  const store = tx.objectStore('todos');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getAllDb = async () => {
  console.log('GET all from the database');
  const todosDb = await openDB('todos', 1);
  const tx = todosDb.transaction('todos', 'readonly');
  const store = tx.objectStore('todos');
  const request = store.getOne(1);
  const result = await request;
  console.log('result.value', result);
  result
  ? console.log('we got the data',result.value)
  : console.log('something broke')
  return result?.value;
};

initdb();
