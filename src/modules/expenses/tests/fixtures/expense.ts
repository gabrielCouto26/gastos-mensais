const date = new Date();

export const expensePayload = {
  name: 'test',
  description: 'description',
  value: 100,
  date: date,
};

export const expenseResponse = {
  id: '1',
  name: 'test',
  description: 'description',
  value: 100,
  date: date,
};

export const updateExpensePayload = {
  name: 'test updated',
  description: 'description updated',
  value: 200,
  date: date,
};

export const updateExpenseResponse = {
  id: '1',
  name: 'test updated',
  description: 'description updated',
  value: 200,
  date: date,
};
