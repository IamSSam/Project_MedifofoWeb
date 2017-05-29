
function emailLogin(){
  $('loginButton').on("click", function(){
    var email = $('#email').val();
    var password = $('#password').val();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    });
  });

}



function logOut(){
  $('logoutButton').on('click', function(){
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    } , function(error) {
    // An error happened.
    });
  })
};
