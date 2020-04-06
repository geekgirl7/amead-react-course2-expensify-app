import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(config);

// make code easier to read and... (see examples below)
const database = firebase.database();

// make life easier for other files to use/work with fbs
export { firebase, database as default };

//===============================================================
// Code below are examples of how to use fbs - keep for reference
//===============================================================

// // Other events we can subscribe to:
// // child_removed - returns the removed item
// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// // child_changed - returns the changed item
// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// // child_added 
// database.ref('expenses').push({
//   'description': 'fourth expense',
//   'note': 'fourth note',
//   'amount': 10111200,
//   'createdAt': 756
// });

// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// // Challenge: 
// // use .one() to set up a subscription to expenses (use one w/value + callback)
// // every time one expense changes it will print the array to the screen
// // Array s/print *once* for initial values.  
// //   Any data change = array w/print again w/correct updated values  
// // database.ref('expenses')
// //   .on('value', (snapshot) => {
// //     const expenses = [];
// //     snapshot.forEach((childSnapshot) => { // called one time for EACH CHILD
// //       expenses.push({
// //         id: childSnapshot.key,
// //         ...childSnapshot.val()
// //       });
// //     });
// //     console.log(expenses);
// //   });

// // Read the existing data from fbs:

// // read the data off the expense .ref():
// // database.ref('expenses')
// //   .once('value')
// //   .then((snapshot) => {
// //     //console.log(snapshot.val());
// //     const expenses = [];
// //     snapshot.forEach((childSnapshot) => { // called one time for EACH CHILD
// //       expenses.push({
// //         id: childSnapshot.key,
// //         ...childSnapshot.val()
// //       });
// //     });
// //     console.log(expenses);
// //   });

// // Challenge: Create 3 new expenses and .push() to fbs
// // database.ref('expenses').push({
// //   'description': 'first expense',
// //   'note': 'first note',
// //   'amount': 12300,
// //   'createdAt': 423
// // });

// // database.ref('expenses').push({
// //   'description': 'second expense',
// //   'note': 'second note',
// //   'amount': 45600,
// //   'createdAt': 534
// // });

// // database.ref('expenses').push({
// //   'description': 'third expense',
// //   'note': 'third note',
// //   'amount': 78900,
// //   'createdAt': 645
// // });

// // Examples:

// // remove a specific note:
// //database.ref('notes/-M44LOEZ5Ujz3n6Y6u7M').remove();

// // update a note id from fbs -M44LOEZ5Ujz3n6Y6u7M
// // reference id from fbs:
// // database.ref('notes/-M44LOEZ5Ujz3n6Y6u7M').update({
// //   title: 'To Do',
// //   body: 'buy food'
// // });

// // second note:
// // database.ref('notes').push({
// //   title: 'Course Topics',
// //   body: 'React Native, Angular, Python'
// // });

// // first note:
// // database.ref('notes').push({
// //   title: 'ToDo',
// //   body: 'Go for a run'
// // });

// // fbs Note example
// // This is how we will store our expenses in fbs
// // const firebaseNotes = {
// //   notes: {
// //     apoijasdf: {
// //       title: 'First fbs note!',
// //       body: 'This is my fbs note'
// //     }, 
// //     fdasfda: {
// //       title: 'A new note',
// //       body: 'This is my new note'
// //     }
// //   }
// // };
// // database.ref().set(firebaseNotes);

// //  'array' example:
// // Interesting, but not how we're going to do it for this project
// //  doing it this way: fbs will not store this the way we want.
// // const notes = [{
// //   id: '12',
// //   title: 'First note!',
// //   body: 'This is my note'
// // }, {
// //   id: '77',
// //   title: 'emz note!',
// //   body: 'This is emz note'
// // } ];

// // add data to fbs - sending a variable as arg to .set()
// // this won't work the way we expect (ie not an array w/indexes)
// // database.ref('notes').set(notes);

// // Challenge:
// // database.ref().on('value', (snapshot) => {
// //   const val = snapshot.val();
// //   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// // });

// // Example: subscribe (.on()) / unsubscribe (.off())
// // const onValueChange = database.ref().on('value', (snapshot) => {
// //   console.log("snapshot: ", snapshot.val());
// // }, (error) => {
// //   console.log('Error with data fetching', error);
// // });

// // setTimeout(() => {
// //   database.ref('age').set(29);
// // }, 3500);

// // setTimeout(() => {
// //   database.ref().off(onValueChange);
// // }, 7000);
// // end subscription example


// // Here: data gets set in fbs but we don't get *notified* bc 
// //   we turned the subscription off in the previous call
// // setTimeout(() => {
// //   database.ref('age').set(30);
// // }, 10500);

// // find all the data at a particular reference:
// // database.ref('location/city')
// //   .once('value') // returns snapshot
// //   .then((snapshot) => {
// //     const val = snapshot.val();
// //     console.log('val: ', val);
// //   })
// //   .catch((error) => {
// //     console.log('Error fetching data: ', error);
// //   });


// // ...use it like so:
// // database.ref().set({
// //   name: 'Sheila Baku',
// //   age: 28,
// //   stressLevel: 6,
// //   job: {
// //     title: 'Software Developer',
// //     company: 'Google'
// //   },
// //   location: {
// //     city: 'Philadelphia',
// //     country: 'United States'
// //   }
// // }).then(() => {
// //   console.log('Data is saved');
// // }).catch((error) => {
// //   console.log('This failed: ', error);
// // });

// // database.ref().update({
// //  name: 'andrew', // chg existing value
// //  age: 26,      // chg existing value
// //  job: 'Software Developer', // add new value
// //  isSingle:null // del existing value
// //   job: 'Manager',
// //   location: {
// //     city: 'Boston' // FAIL! wipes out 'country'
// //     'location/city': 'Boston' // need quotes for valid JS
// //   }
// // });

// // database.ref().update({
// //   stressLevel: 9,
// //   'job/company': 'Amazon',
// //   'location/city': 'Seattle'
// // });

// // database.ref().update({
// //   name: 'Mike', // chg existing value
// //   age: 29,      // chg existing value
// //   job: 'Software Developer', // add new value
// //   isSingle:null // del existing value
// // });

// // database.ref('isSingle')
// // .remove()
// // .then(() => {
// //   console.log('isSingle is removed');
// // }).catch((error) => {
// //   console.log('oopsi!... ', error);
// // });


