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


  var table = $('#datatable-buttons2').DataTable( {
    "language": {
           "lengthMenu": "Display _MENU_ records per page",
           "zeroRecords": "검색 정보가 없습니다.",
           "info": "Showing page _PAGE_ of _PAGES_, Number of patient: _MAX_",
           "infoEmpty": "사용 가능 기록 없음",
           "infoFiltered": "(filtered from _MAX_ total records)"
    },

    searching: true,
    paging: true,
    dom: "Bfrtip",
    buttons: [
    {
      extend: "copy",
      className: "btn-sm"
    },
    {
      extend: "excel",
      className: "btn-sm"
    },
    {
      extend: "pdf",
      className: "btn-sm"
    },
    {
      extend: "print",
      className: "btn-sm"
    },
    ],

  } );

  var counter = "";

  $.ajax({
    url: 'http://igrus.mireene.com/medifofo_web/php/patient_list_queue.php',
    type: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data[10]);
      var patientInformationText = data[10].information_text;
      var patient = patientInformationText.split(", ");
      var reservedDate = data[10].datetime.substring(0,10);

      table.row.add( [
          counter + patient[8],
          counter + patient[9],
          counter + patient[10],
          counter + patient[11],
          counter + reservedDate,
          counter + ""
      ] ).draw( false );

      counter++;

    },
    error: function(request, status, error){
      console.log(request, status, error);
    },
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
