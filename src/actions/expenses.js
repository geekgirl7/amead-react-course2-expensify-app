import uuid from 'uuid';

// Action Generators
// export all as named exports

// ADD_EXPENSE - Action Generator
// can't use an obj variable here bc setting param defaults
export const addExpense=(
  {
    description='',
    note='',
    amount=0,
    createdAt=0
  }={}) => ({
    type: 'ADD_EXPENSE',
    expense: {
      id: uuid(),
      description,
      note,
      amount,
      createdAt
    }
  });

// REMOVE_EXPENSE - Action Generator
// just need (destructured) id for payload
export const removeExpense=({id}={}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
export const editExpense=(id,updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});
