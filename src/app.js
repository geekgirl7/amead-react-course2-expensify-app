// install -> import -> use
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter'; 
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses.js';
import {setTextFilter} from './actions/filters.js';
//import expensesReducer from './reducers/expenses.js';
import getVisibleExpenses from './selectors/expenses.js';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

// This is the variable you will pass to <Provider /> as the prop ***store***:
//  <Provider store={store}>
const store = configureStore();


//console.log(store.getState());
// Original, for development/training only!  
// don't do it this way!
// store.subscribe(() => {
//   const state = store.getState();
// //  console.log('store.subscribe: ', state);
//   const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
//   console.log('subscribe: ', visibleExpenses);
// });

console.log("Hello!"); // for testing only

store.dispatch(addExpense({description: 'Rent',amount: 100}));
store.dispatch(addExpense({description: 'Coffee',amount: 300, createdAt: 2000}));
store.dispatch(addExpense({description: 'Water bill',amount: 4500}));
store.dispatch(addExpense({description: 'Gas bill',createdAt: 1000}));
store.dispatch(addExpense({description: 'Rent',amount: 109500}));
store.dispatch(addExpense({description: 'Groceries',amount: 5000}));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

// store.dispatch(setTextFilter('bill'));
// //store.dispatch(setTextFilter('groceries'));

// setTimeout(() => {
//   store.dispatch(setTextFilter('groceries'));
// }, 3000);

//ReactDOM.render(<AppRouter />, document.getElementById('app'));

// Provider requires the ***store prop*** (in our app we named our store: 'store' )
const jsx = ( // parens
  <Provider store={store}>
    <AppRouter />
  </Provider>
  );
ReactDOM.render(jsx, document.getElementById('app'));


