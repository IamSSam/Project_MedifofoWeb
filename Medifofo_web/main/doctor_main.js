var table;

$(document).ready(function(){
  var scroll_start = 0;
  var startchange = $('#main-content');
  var offset = startchange.offset();
  $(document).scroll(function() {
     scroll_start = $(this).scrollTop();
     if(scroll_start > offset.top) { // 스크롤 내려갔을 때
         $('#navbar').css('background-color', '#00d2a5');
         $('#home').css('color', '#fff');
         $('#fh5co-logo').css('color', '#fff');
         $('#nav-user-name').css('color', '#fff');
      } else {
         $('#navbar').css('background-color', '#ffffff');
         $('#home').css('color', '#00d2a5');
         $('#fh5co-logo').css('color', '#73879C');
         $('#nav-user-name').css('color', '#000');
      }
  });

  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      console.log(user);

      var user = firebase.auth().currentUser;
      var user_name = user.email;
      var user_name = user.displayName;
      var user_picture = "http://graph.facebook.com/" + user.providerData[0].uid +"/picture?type=small";
      console.log(user);
      console.log(user_name);
      //document.getElementById('user-name').innerHTML = user_name;
      document.getElementById('nav-user-image').src = user_picture;
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

  var counter = "";

  $.ajax({
    url: 'http://igrus.mireene.com/medifofo_web/php/patient_list_queue.php',
    type: 'GET',
    dataType: 'json',
    success: function(data){
      for(var i = 0; i < data.length; i++){
        console.log(data[data.length-1]);
      }
      var patientInformationText = data[data.length-1].information_text;
      var patientQuestionText = data[data.length-1].question_text;
      var patient = patientInformationText.split(", ");
      var reservedDate = data[data.length-1].datetime.substring(0,10);

      table.row.add( [
          counter + patient[8],
          counter + patient[9],
          counter + patient[10],
          counter + patient[11],
          counter + reservedDate,
          counter + "열람"
      ] ).draw( false );

      counter++;

      $('#datatable-buttons2').on('click', 'tr', function () {
        var table_data = table.row( this ).data();
        //alert( 'You clicked on '+data[0]+'\'s row' );
        var mymodal = $('#myModal');
        mymodal.find('.modal-name').text(table_data[0]);
        mymodal.find('.modal-birth').text(table_data[3]);
        mymodal.find('.modal-gender').text(table_data[2]);
        mymodal.find('.modal-height').text(patient[0]);
        mymodal.find('.modal-weight').text(patient[1]);
        mymodal.find('.modal-abo').text(patient[2]);
        mymodal.find('.modal-medicine').text(patient[3]);
        mymodal.find('.modal-allery').text(patient[4]);
        mymodal.find('.modal-history').text(patient[5]);
        mymodal.find('.modal-sleeptime').text(patient[6]+" hours");
        mymodal.find('.modal-dailystride').text(patient[7]+" steps");
        mymodal.find('.modal-symptom').text(patientQuestionText);
        mymodal.find('.modal-comment').text(patient[12]);
        mymodal.modal('show');
      });


    },
    error: function(request, status, error){
      console.log(request, status, error);
    },
  });


});
