$(function() {

  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      console.log(user);

      var user = firebase.auth().currentUser;
      var user_picture = "http://graph.facebook.com/" + user.providerData[0].uid +"/picture?type=small";
      var user_name = user.displayName;
      document.getElementById('user-image').src = user_picture;
      document.getElementById('user-name').innerHTML = user_name;
      document.getElementById('nav-user-image').src = user_picture;
      document.getElementById('nav-user-name').innerHTML = user_name;
      console.log(user_picture);
      //var user_picture = user.uid;


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
