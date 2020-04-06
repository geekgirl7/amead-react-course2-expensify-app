import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from'../fixtures/expenses';
import database from '../../firebase/firebase';

// can call this from any test case.
// this is the *config*, so all test cases will create the *same* mock store
// need to pass in an array of middleware for it to use
const createMockStore = configureMockStore([thunk]);

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  });
});

test('should setup add expense action object with provided values', () => {
  // can use an expense from fixtures (w/ the index!)
  // const expenseData = {
  //   description: 'Rent',
  //   amount: 109500,
  //   createdAt: 1000,
  //   note: 'This was last months rent'
  // };
  const action = addExpense(expenses[1]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[1]
    // don't need to specify the obj any more, using fixtures now
    // ...however, note that this test will pass if you use it!
    // expense: {
    //   ...expenses[1],
    //   id: expect.any(String)
    // }
  });
});

// New firebase tests:
//========================================================
//========================================================
// need to tell jest this is async test by passing done here
  //  (must use *done*)
  // this will force jest to wait for async to return before completing the test
test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: "Mouse",
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000 // don't use 0 bc we need value *other than* the default!
  }

  // This code uses promise chaining to avoid Callback Hell:
  store.dispatch( startAddExpense(expenseData)).then( () => {
    const actions = store.getActions();
    expect( actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done(); // the test is NOT a success until done() is called *here*
    });
});


test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  }

  // This code uses promise chaining to avoid Callback Hell:
  store.dispatch( startAddExpense({})).then( () => {
    const actions = store.getActions();
    expect( actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDefaults);
      done(); // the test is NOT a success until done() is called *here*
    });  
});

  // this code uses Callback Hell
  // .then( () => {
  //   const actions = store.getActions();
  //   expect( actions[0]).toEqual({
  //     type: 'ADD_EXPENSE',
  //     expense: {
  //       id: expect.any(String),
  //       ...expenseData
  //     }
  //   });

  //   database.ref(`expenses/${actions[0].expense.id}`)
  //   .once('value')
  //   .then((snapshot) => {
  //     expect(snapshot.val()).toEqual(expenseData);
  //     done(); // the test is NOT a success until done() is called *here*
  //   });
  // }); // end .then()

//========================================================
//========================================================
// don't need this test any more - we're now setting up the defaults in startAddExpense
// keep this for reference, will follow the logic in another test
// test('should setup add expense action object with default values', () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       id: expect.any(String),
//       description: '',
//       note: '',
//       amount: 0,
//       createdAt: 0
//     }
//   });
// });
