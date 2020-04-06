import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_EXPENSE
// refactored after startAddExpense:
// Note that this will break the existing tests!
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

// ADD_EXPENSE
// original:
// export const addExpense = (
//   {
//     description = '',
//     note = '',
//     amount = 0,
//     createdAt = 0
//   } = {}
// ) => ({
//   type: 'ADD_EXPENSE',
//   expense: {
//     id: uuid(),
//     description,
//     note,
//     amount,
//     createdAt
//   }
// });

export const startAddExpense = (expenseData = {}) => {
  // return a func = why we need redux-thunk!
  // by default, redux won't allow it
  // destructure expenseData:
  return (dispatch) => {
     const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    // can also pass the obj into push(), but var makes it easier to read
    // *this is an alternate way to do it*
    const expense = { description, note, amount, createdAt };

    // same as examples in firebase.js
    // return this so it can be used in promise chaining (tests)
    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});
