import {addExpense,editExpense,removeExpense} from '../../actions/expenses';

test('should setup remove expense action object',() => {
  const action=removeExpense({id: '123abc'});
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
});

// Challenge 1: EDIT_EXPENSE
// Setup test case
// Call editExpense { note: 'New note value' }
// Make an assertion
test('should setup edit expense action object',() => {
  const action=editExpense('123abc',{note: 'hello'});
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {note: 'hello'} // don't forget the colon (:) after updates!
  });
});

// Challenge 2: ADD_EXPENSE
// Will be 2 tests: 1 for defaults, 1 for provided values
// Test 1: Andrew:
test('should setup add expense action object with provided values',() => {
  // 1: define an object with the 4 properties
  // NOTE THAT id IS NOT INCLUDED HERE!  
  //   it's dynamic so we can't test the value directly
  //   will use expect.any() for this one in the test as shown below
  const expenseData={
    description: 'Rent',
    amount: 109500,
    createdAt: 1000,
    note: 'This was last months rent'
  };
  // 2: Pass expenseData into the test:
  const action=addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });

});

// // Test 2: Emmie
// test('should setup add expense action object with default values', () => {
//   const expenseData = {
//     description: '',
//     note: '',
//     amount: 0,
//     createdAt: 0
//   };
//   const action = addExpense(expenseData)
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense:{
//       ...expenseData,
//       id: expect.any(String)
//     }
//   });
// });

// Better Test 2: Andrew:
test('should setup add expense action object with default values',() => {
  // don't need an extra variable!
  // remove: 
  //   const expenseData = { blah }
  //   const action=addExpense(expenseData)
    const action = addExpense();
    expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
      }
    });
  });
