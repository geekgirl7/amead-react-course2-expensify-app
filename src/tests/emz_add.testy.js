// Test file extension is ALWAYS ___.test.js

// The function that we're testing:
const add=(a,b) => a+b;

// Challenge:
const generateGreeting = (name = 'anonymous') => `Hello ${name}!`;

test('should generate greeting with default name', () => {
  const greeting = generateGreeting();
  expect(greeting).toBe('Hello anonymous!');
});

test('should generate greeting with name arg', () => {
  const greetingWithName = generateGreeting('Emmie');
  expect(greetingWithName).toBe('Hello Emmie!');
});

// Test for add()
// we have access to a set of global variables jest gives to us
//   which will allow us to construct our test cases:
// test('strToDescribeTheTest', codeToRunForTestCase_anArrowFunc);

test('should add two numbers',() => {
  // create a result variable
  const result=add(3,4);

  // need to check the return value!
  //  if NOT correct, need to throw an error, otherwise...
  //  the test will always return true, and the test always passes
  // The following is an *assertion*.  jest has an assertion library that we will use
  //  This code is for example only.
  // if(result !== 7) {
  //   throw new Error(`you added 3 and 4. The result was ${result}. Expect 7`);
  // }

  // BETTER: use the assertion library instead:
  // assertion library docs: 
  // https://facebook.github.io/jest/docs/en/getting-started.html : 
  //   API reference - *Globals* section
  // NOTE: expect has it's own section in the API reference bc it has so many options
  // NOTE: These assertions will only work in ___.test.js files!
  expect(result).toBe(7);

});