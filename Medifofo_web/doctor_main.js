$(document).ready(function(){
  $("#logoutButton").click(function(){
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
      window.location = 'doctor_form.html';
    }, function(error) {
      // An error happened.
      console.log(error);
    });
  });
});
