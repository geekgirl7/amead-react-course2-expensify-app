import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// use lower case for the adapter property
Enzyme.configure({
  adapter: new Adapter()
});

// Note: this is all we need for the setupTests.js file 