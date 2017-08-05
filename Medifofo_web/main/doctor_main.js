$(function() {

  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      console.log(user);

      var user = firebase.auth().currentUser;
      var user_name = user.displayName;
      document.getElementById('user-name').innerHTML = user_name;
      document.getElementById('nav-user-name').innerHTML = user_name;
  
    }else{
      console.log('not logged in');
    }
  });
});

$(document).ready(function(){
  $("#logoutButton").click(function(){
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
      window.location = '../doctor_form.html';
    }, function(error) {
      // An error happened.
      console.log(error);
    });
  });

  $("#nav-logoutButton").click(function(){
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
      window.location = '../doctor_form.html';
    }, function(error) {
      // An error happened.
      console.log(error);
    });
  });
});
