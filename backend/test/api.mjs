const baseUrl = 'http://localhost:3003/api';

const getAll = async () => {
  try {
    const response = await fetch(`${baseUrl}/restaurants`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.err(err);
    return { error: err.message };
  }
};

const getById = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/restaurants/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.err(err);
    return { error: err.message };
  }
};

const postNew = async (restaurant) => {
  try {
    const response = await fetch(`${baseUrl}/restaurants`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(restaurant),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

const deleteById = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/restaurants/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    return response.status;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

export { getAll, getById, postNew, deleteById };
