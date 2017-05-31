window.onload = function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDiXW9MnTR5ME_brg38JUdUe808V6o0mL0",
    authDomain: "medifofoweb.firebaseapp.com",
    databaseURL: "https://medifofoweb.firebaseio.com",
    projectId: "medifofoweb",
    storageBucket: "medifofoweb.appspot.com",
    messagingSenderId: "744363956828"
  };

  firebase.initializeApp(config);
};

function registerDoctor(){
  const txtEmail = document.getElementById('email');
  const txtPassword = document.getElementById('password');
  const buttonRegister = document.getElementById('registerButton');

  buttonRegister.addEventListener('click', e => {
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();

    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 8) {
      alert('Please enter a password.');
      return;
    }

    auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorMessage);

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        console.log(firebaseUser);
      }else{
        console.log('not logged in');
      }
    });

    });
  });
};
