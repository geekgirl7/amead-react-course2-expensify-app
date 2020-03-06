//
// Object destructuring
//

// const person = {
//   name: 'Emmie',
//   age: 21,
//   location: {
//     city: 'Houston',
//     temp: 70
//   }
// };

// Cumbersome, doesn't scale well:
// const name = person.name; 
// const age = person.age;
// Destructuring = much better:
// const{name, age} = person;
// console.log(`${name} is ${age}.`);

// const city = person.location.city;
// const temp = person.location.temp;
// const {city, temp: temperature=60} = person.location;
// console.log(`It's ${temperature} in ${city}.`);

// Challenge - From:
// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     name: 'Penguin'
//   }
// };

// const { name: publisherName='Self-Published' } = book.publisher;
// console.log(publisherName); // Penguin, Self-Published

//
// Array destructuring
// Use [] (square brackets to destructure an array)
// Matches by POSITION, not name!
// If you want to leave off elements at the end, don't
//   include the "last" element in the destructured array.
//   Any elems that follow it will also be ignored.
// If you want to skip an item before the end, just
//   use a comma and leave the name out
//   (the comma is a placeholder for that "space")
//
// There is no re-naming syntax for arrays (bc there are NO names!)
// Can still set up default values

//const address = ['1234 Main St', 'Houston', 'TX', '77466']
// no state:
const address = ['1234 Main St', 'Houston'];
const [street, city, state='LA'] = address;

console.log(`You are at ${street} in ${city}, ${state}`);

// Challenge
const menu = ['Coffee(iced)', '$2.00', '$3.50', '$2.75'];
const [item , ,medium] = menu;
console.log(`A medium ${item} costs ${medium}.`);

