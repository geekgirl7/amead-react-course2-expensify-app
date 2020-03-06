import {createStore,combineReducers} from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

// This is where we pull everything together: 
//   imports + the store itself

// wrap the createStore function in another function to
//  make it easy to export:
export default () => {
  const store=createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    })
  );
  return store;
};

