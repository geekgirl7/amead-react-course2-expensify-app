import {createStore,combineReducers} from 'redux';
import uuid from 'uuid';

// Action Generators

// ADD_EXPENSE - Action Generator
// can't use an obj variable here bc setting param defaults
const addExpense=(
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
const removeExpense=({id}={}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
const editExpense=(id,updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// SET_TEXT_FILTER
const setTextFilter=(text='') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT_BY_AMOUNT
// don't set the sortBy string to 'amount' here!
// since it will never change, set it in the reducer
const sortByAmount=() => ({
  type: 'SORT_BY_AMOUNT'
});

// don't set the sortBy string to 'date' here!
// since it will never change, set it in the reducer
// SORT_BY_DATE
const sortByDate=() => ({
  type: 'SORT_BY_DATE'
});

// SET_START_DATE
// don't need to set undefined since it's already in filtersReducerDefaultState
// const setStartDate=(startDate=undefined) => ({
const setStartDate=(startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

// SET_END_DATE
// don't need to set undefined since it's already in filtersReducerDefaultState
//const setEndDate=(endDate=undefined) => ({
const setEndDate=(endDate) => ({
  type: 'SET_END_DATE',
  endDate
});

// Will use a reducer for each root property on the state:
//  expenses and filters
// We will create a reducer for each, as if the other
//  didn't exist (completely separate & independent of each other)
// We're going to combine the 2 reducers to create the
//  complete store

// Expenses reducer
// state default for expenses: [] (no default expense)
// state default for filters: text, sortBy, start/endDate
// c/create a variable for state default to make more readable:
const expensesReducerDefaultState=[];

const expensesReducer=(state=expensesReducerDefaultState,action) => {
  switch(action.type) {
    case 'ADD_EXPENSE':
      return [...state,action.expense];
    case 'REMOVE_EXPENSE':
      // Note: don't need all this code, but leave it to remember destructuring
      // below, in filter, id = destructured state.expense.id:
      //   state.filter( ( id: state.expense.id == id:id = id ) )
      // const newArr=state.filter(({id}) => {
      //   return id !== action.id  // return true UNLESS they match
      // });
      // console.log("REMOVE_EXPENSE:: ", newArr);
      // can clean up the following line:
      //   return state.filter( ({id}) => {return id !== action.id} );
      //   refactored version below:
      return state.filter(({id}) => id!==action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if(expense.id===action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

// Filters reducer
const filtersReducerDefaultState={
  text: "",
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer=(state=filtersReducerDefaultState,action) => {
  switch(action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount' // determines the sort METHOD: by amount
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'   // determines the sort METHOD: by date
      }
    case 'SET_START_DATE':
      //console.log('reducer: ', action.startDate);
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      //console.log('reducer: ', action.endDate);
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state;
  }
};

// This snippet for reference only: args = expenses, filters,
//   filters is destructed in the "real" code below.
// const getVisibleExpenses=(expenses,filters) => {
//    return expenses.filter((expense) => {
//      const startDateMatch=typeof filters.startDate !=='number'||expense.createdAt >= filters.startDate;
//      const endDateMatch=typeof filters.endDate !== 'number'||expense.createdAt <= filters.endDate;
//      const textMatch=true; // for now
//      return filters.startDateMatch && filters.endDateMatch && filters.textMatch;
//    });
// };

// Get visible expenses
const getVisibleExpenses=(expenses,{text,sortBy,startDate,endDate}) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    //console.log (expense.description.toLowerCase(), ' ', text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  });
};

// Store creation
// console.log(store.getState());
// prints [] initially but....
// we want the array to live on the expenses property
// need to change args for createStore(): combineReducers

const store=createStore(combineReducers({
  expenses: expensesReducer,
  filters: filtersReducer
}));

// store.subscribe(() => {
//   console.log(store.getState());
// });

// store.subscribe(() => {
//   const state=store.getState();
//   console.log('store.subscribe: ', state);
//   const visibleExpenses=getVisibleExpenses(state.expenses, state.filters);
//   //  console.log(visibleExpenses);
// });
store.subscribe(() => {
  const state = store.getState();
//  console.log('store.subscribe: ', state);
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log('subscribe: ', visibleExpenses);
});

const expenseOne=store.dispatch(addExpense({description: 'Rent',amount: 100}));
const expenseTwo=store.dispatch(addExpense({description: 'Coffee',amount: 300}));

// should end up with just Coffee, with a price of $5.00
//store.dispatch(removeExpense({id: expenseOne.expense.id}));
// store.dispatch(editExpense(
//   expenseTwo.expense.id,
//   {amount: 500}
// ));

// // should set the text filter to 'rent' (not blank string)
//store.dispatch(setTextFilter('rent'));
store.dispatch(setTextFilter('rent'));
store.dispatch(setTextFilter('ee'));

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125)); // {startDate: 125}
// store.dispatch(setStartDate());    // {startDate: undefined}
// store.dispatch(setEndDate(1250)); // {startDate: 1250}
// store.dispatch(setEndDate());    // {startDate: undefined}


const demoState={
  expenses: [{
    id: 'jdfskf',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500, // pennies = no rounding issues!
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,  // this will change later
    endDate: undefined     // this will change later
  }
};

//=== Spreading Objects Example ===//
// const user={
//   name: 'Jen',
//   age: 24
// };

// console.log('user: ',user);
// console.log('...user: ',{
//   age: 24,
//   ...user,
//   location: 'Philadelphia'
// });



