import Firebase from 'firebase'
var firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyAMf2jEV2axH3gzrFlOCzYwH21GMs7EkpA',
  authDomain: 'sandbox-e59e4.firebaseapp.com',
  databaseURL: 'https://sandbox-e59e4.firebaseio.com',
  projectId: 'sandbox-e59e4',
  storageBucket: '',
  messagingSenderId: '1027874309381'
})

var db = firebaseApp.database()

export default db
