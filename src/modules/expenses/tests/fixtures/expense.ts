const date = new Date();

export const findAllExpenseResponse = [
  {
    id: 1,
    name: 'test',
    description: 'description',
    value: 100,
    date: date,
  },
  {
    id: 2,
    name: 'test 2',
    description: 'description 2',
    value: 200,
    date: date,
  },
  {
    id: 3,
    name: 'test 3',
    description: 'description 3',
    value: 300,
    date: date,
  },
];

export const findOneExpenseResponse = {
  id: 1,
  name: 'test',
  description: 'description',
  value: 100,
  date: date,
};

export const createExpensePayload = {
  id: 1,
  name: 'test',
  description: 'description',
  value: 100,
  date: date,
};

export const createExpenseResponse = {
  id: 1,
  name: 'test',
  description: 'description',
  value: 100,
  date: date,
};

export const updateExpensePayload = {
  id: 1,
  name: 'test updated',
  description: 'description updated',
  value: 200,
  date: date,
};

export const updateExpenseResponse = {
  id: 1,
  name: 'test updated',
  description: 'description updated',
  value: 200,
  date: date,
};
