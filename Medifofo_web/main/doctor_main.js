var table;

$(function() {

  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      console.log(user);

      var user = firebase.auth().currentUser;
      var user_name = user.email;
      var user_name = user.displayName;
      console.log(user);
      console.log(user_name);
      //document.getElementById('user-name').innerHTML = user_name;
      document.getElementById('nav-user-name').innerHTML = user_name;

    }else{
      console.log('not logged in');
    }
  });

  table = $('#datatable-buttons2').DataTable( {
    select: {
      style: 'multi'
    },
    "language": {
           "lengthMenu": "Display _MENU_ records per page",
           "zeroRecords": "검색 정보가 없습니다.",
           "infoEmpty": "기록 없음",
           "infoFiltered": "(filtered from _MAX_ total records)"
    },

    searching: true,
    paging: true,
    dom: '<"top"f>rt<"bottom"ip><"clear">',
    
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
