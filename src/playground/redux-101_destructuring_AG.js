import { createStore } from 'redux';

// Action generators - functions that return action objects
// Step 1 create a function (using arrow function here)
// use destructuring instead: const incrementCount = (payload = {}) => ({


// -------------------------------------------------------
// destructuring example:
// "normal" function:
// const add = (data) => {
//   return data.a + data.b;
// };
// Above, w/destructured args:
//  const add = ({a, b}) => { // pull a & b off the arg obj.
//    return a + b;
//  };
// console.log( add({a:1, b:12}) );

// add another arg (c) to above:
  // const add = ({a, b}, c) => {
  //   return a + b + c;
  // };
  // console.log( add({a:1, b:12}, 100) );
// -------------------------------------------------------

// Original version:
  // const incrementCount = (payload = {}) => ({
  //   // returns a new action object
  //   // can use an implicit return here
  //   type: 'INCREMENT',
  //   incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
  // });

// Destructured version:
//  1) replace payload w/obj
//  2) destructure incrementBy
//  3) remove 'payload' object
//  4) set default value for incrementBy
//  5) don't need conditional op. just use incrementBy

  const incrementCount = ({incrementBy = 1} = {}) => ({
    // returns a new action object
    // can use an implicit return here
    type: 'INCREMENT',
//  6) obj.property with same name as key = use "key" name
//    incrementBy: incrementBy;
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
const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      // no longer need the conditional operator, as above
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
});

// How to watch changes to the store:
store.subscribe( () => {
  console.log(store.getState());
});

// Actions - an object that gets sent to the store
// examples: increment, decrement, reset

// Define the Actions:
// I'd like to increment the count
// by itself the object does nothing:
//{
//  type: 'INCREMENT'
//}

// example: remaining dispatch() will NOT be called
// unsubscribe();

// This will actually change the store:
// (just copy the object into store.dispatch)
// store.dispatch({
//   type: 'INCREMENT', 
//   incrementBy: 5
// });

store.dispatch( incrementCount({ incrementBy: 5}) );

store.dispatch( incrementCount() );

//Challenge:
// RESET - set the count equal to zero
store.dispatch({ type: 'RESET' });

// Challenge: decrementBy: 10
// dispatch twice to test the code
// one w/decrementBy and 1 without it.
store.dispatch( decrementCount() );

store.dispatch( decrementCount({ decrementBy: 10 }) );

// Can also have actions that are required types
// (so don't need defaults/check if they exist)
// store.dispatch ({
//   type: 'SET',
//   count: 101
// });
store.dispatch( setCount({count: 101}) );

store.dispatch( resetCount() );


