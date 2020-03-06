import { createStore } from 'redux';


  const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
  });

  const decrementCount = ( {decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
  });

  // count is required by user, so don't need a default
  const setCount = ({ count }) => ({
    type: 'SET',
    count
  });

  const resetCount = () => ({
    type: 'RESET'
  });

  // Reducers
  // move the ***function here*** FROM 
  // const store = createStore( ***(state = { count: 0 }, action) => {...}*** );
  const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return {
          count: state.count + action.incrementBy
        };
      case 'DECREMENT':
        return {
          count: state.count - action.decrementBy
        }
        case 'RESET':
          return {
            count: 0
          }
        case 'SET':
          return {
            count: action.count
          }
      default:
        return state;
    }
  };

  // now that the ***function*** is moved to countReducer,
  //   pass in countReducer to the store
  //   (instead of the function itself)
  // Note: all we did before was ***inline the reducer*** 
  //   in createStore()
  //   Now it's in it's own function = easier to read/test
  const store = createStore(countReducer);

// How to watch changes to the store:
store.subscribe( () => {
  console.log(store.getState());
});

store.dispatch( incrementCount({ incrementBy: 5}) );

store.dispatch( incrementCount() );

store.dispatch({ type: 'RESET' });

store.dispatch( decrementCount() );

store.dispatch( decrementCount({ decrementBy: 10 }) );

store.dispatch( setCount({count: 101}) );

store.dispatch( resetCount() );


