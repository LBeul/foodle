import { deleteById, getAll, getById, postNew } from './api.mjs';

const logAll = async () => {
  const response = await getAll();
  console.log('ALL:');
  console.log(response);
};

const logById = async (id) => {
  const response = await getById(id);
  console.log('BY ID:');
  console.log(response);
};

const postAndLog = async (data) => {
  const response = await postNew(data);
  console.log('ADDED:');
  console.log(response);
  return response.id;
};

const deleteAndLog = async (id) => {
  const response = await deleteById(id);
  console.log('DELETED:', response);
};

const launchOrchestratedTests = async () => {
  await logAll();
  await logById('65297704350d809f176dea57');
  const newID = await postAndLog({
    title: 'AutomatedTest',
    likeCount: 0,
    imageSrc: 'test',
    street: 'Radickestraße 20',
    zipCode: '12489',
    description: 'lorem ipsum dolor sit amet',
  });
  deleteAndLog(newID);
};

launchOrchestratedTests();
