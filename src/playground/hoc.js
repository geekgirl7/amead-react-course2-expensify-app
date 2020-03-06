//  Higher Order Component (HOC): 
//    a component (HOC) that renders another component (regular component)
//  Can use the HOC to render many other regular components
//    (e.g. if you have 7-8 regular components,
//      you can use the same HOC to render each of them.
//    )
//  HOCs can:
//    Reuse code
//    "Render hijacking"
//    Prop manipulation
//    Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

// THIS IS *** NOT *** AN HOC = regular component:
const Info = (props) => ( // parens
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
  );
  
// HOC demo, using the obj spread operator for props:
// will return an "alternative" version of the regular component
//  (in this example, Info)
//  The convention is to use *WrappedComponent*.
//  (use caps for the name, it's a component!)
//  Do NOT use the actual component name (!== code reuse!)
// const withAdminWarning = (WrappedComponent) => { // braces
//   // THIS is the real HOC (note it's an SFC):
//   return (props) => (
//     // Note that we are using the spread operator for props:
//     <div>
//      <p>This is private info, please don't share!</p> 
//      <WrappedComponent {...props}/>
//     </div>
//   );
// };

const withAdminWarning = (WrappedComponent) => { // braces
  // THIS is the real HOC (note it's an SFC):
  return (props) => (
    // Note: using the spread operator for props, with logic:
    <div>
     { props.isAdmin && <p>This is private info, please don't share!</p>} 
     <WrappedComponent {...props}/>
    </div>
  );
};

// call the HOC with the component you want to wrap:
const AdminInfo = withAdminWarning(Info);

// Challenge:
// *** calling *** the new (HOC) function
//  Show the component if user isAuthenticated === {true}
//  Show a message if isAuthenticated === false;
// const AuthInfo = requireAuthentication(Info);
const requireAuthentication = (WrappedComponent) => { // braces
  return (props) => (
    <div>
      {
        props.isAuthenticated 
        ? (<WrappedComponent {...props}/>)
        : (<p>Please log in to continue.</p>)
      }
    </div>
  );
};
const AuthInfo = requireAuthentication(Info);

// render Info as usual:
// ReactDOM.render(<Info info="Howdy!" />, document.getElementById('app'));

// render HOC, passing in AuthInfo:
ReactDOM.render(<AuthInfo isAuthenticated={true} info="Howdy!" />, document.getElementById('app'));