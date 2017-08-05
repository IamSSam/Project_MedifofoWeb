$(document).ready(function(){

   var scroll_start = 0;
   var startchange = $('.navbar-header');
   var offset = startchange.offset();
   $('#navdiv').css('background-color', 'white');
   $(document).scroll(function() {
      scroll_start = $(this).scrollTop();
      if(scroll_start > offset.top) { // 스크롤 내려갔을 때
          $('#navdiv').css('background-color', '#00d2a5');
          $('#plist').css('color','white');
          $('.navbar-header').css('background-color', '#f3f1f1');
          $('.navbar-header').css('color', '#00d2a5');
       } else {
          $('#navdiv').css('background-color', 'white');
          $('#plist').css('color','black');
          $('.navbar-header').css('background-color', '#00d2a5');
          $('.navbar-header').css('color', '#fff');
       }
   });

});

$(function() {
  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      console.log(user);

      var user = firebase.auth().currentUser;
      var user_picture = "http://graph.facebook.com/" + user.providerData[0].uid +"/picture?type=small";
      var user_name = user.displayName;
      document.getElementById('user-name').innerHTML = user_name;
      document.getElementById('nav-user-name').innerHTML = user_name;
      console.log(user_picture);
      //var user_picture = user.uid;


    }else{
      console.log('not logged in');
    }
  });


  var table = $('#datatable-buttons2').DataTable( {
    searching: true,
    paging: true,
    dom: "Bfrtip",
    buttons: [
    {
      extend: "copy",
      className: "btn-sm"
    },
    {
      extend: "csv",
      className: "btn-sm"
    },
    {
      extend: "excel",
      className: "btn-sm"
    },
    {
      extend: "pdfHtml5",
      className: "btn-sm"
    },
    {
      extend: "print",
      className: "btn-sm"
    },
    ],
    "language": {
            "lengthMenu": "Display _MENU_ records per page",
            "zeroRecords": "Nothing found - sorry",
            "info": "Showing page _PAGE_ of _PAGES_",
            "infoEmpty": "No records available",
            "infoFiltered": "(filtered from _MAX_ total records)"
        }
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
