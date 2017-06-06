$(function() {

  moveLoginTab();
  moveRegisterTab();

  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      console.log(user);

      $("#login-form").delay(100).fadeIn(100);
      $("#facebook-form").delay(100).fadeIn(100);
      $("#register-form").fadeOut(100);
      $('#register-form-link').removeClass('active');
      $('#login-form-link').addClass('active');

      var user = firebase.auth().currentUser;
      var user_picture = "http://graph.facebook.com/" + user.providerData[0].uid +"/picture?type=large";

      if(typeof user_picture === 'undefined' || !user_picture){
        document.getElementById('user-image').src = user_picture;
      }else{
        document.getElementById('user-image').src = "./main/images/user.png";
      }

      if(user){
        // TODO: Move to Main page
        window.location = './main/doctor_main.html';

      }else{
        location.href = '#';
      }

    }else{
      console.log('not logged in');
    }

  });

});

function moveLoginTab(){
  $('#login-form-link').click(function(e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#facebook-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
}

function moveRegisterTab(){
  $('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
    $("#facebook-form").fadeOut(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
}

$("#registerButton").on('click', event => {
    event.preventDefault();

    const txtEmail = document.getElementById('email_id');
    const txtPassword = document.getElementById('password');
    const txtName = document.getElementById('doctor_name');
    const txtPhone = document.getElementById('doctor_phone');
    const txtHospital = document.getElementById('hospital_name');

    const email = txtEmail.value;
    const password = txtPassword.value;
    const doctor_name = txtName.value;
    const doctor_phone = txtPhone.value;
    const hospital_name = txtHospital.value;
    const auth = firebase.auth();

    if(!doctor_name || doctor_name.length == 0){
      alert('이름을 입력해주세요.');
      txtName.focus();
      return;
    }
    if (!email || email.length < 4) {
      alert('email을 입력해주세요.');
      txtEmail.focus();
    }else if (!password || password.length < 8) {
      alert('비밀번호를 입력해주세요.');
      txtPassword.focus();
    }else{
      event.preventDefault();
    }

    auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    if(errorCode === 'auth/email-already-in-use'){
      alert('이미 존재하는 아이디입니다.');
      return;
    }
    if(errorCode === 'auth/network-request-failed'){
      alert('네트워크 에러입니다.');
      return;
    }
    if(errorCode === 'auth/invalid-email'){
      alert('이메일 형식에 맞게 작성해주세요. ex) medifofo@elysium.com');
      return;
    }

    console.log(error);

  });


  $.ajax({
    url: 'http://igrus.mireene.com/medifofo_web/php/doctor_register.php',
    type: 'post',
    dataType: 'text',
    data: {
      email_id : $('#email_id').val(),
      platform : 1,
      doctor_name : $('#doctor_name').val(),
      doctor_phone : $('#doctor_phone').val(),
      hospital_name : $('#hospital_name').val(),
    },
    success: function(data){
      console.log(data);
    }
  });

});

$("#login-form").on('submit', event => {
    event.preventDefault();

    const txtEmail = document.getElementById('user_email');
    const txtPassword = document.getElementById('user_password');

    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();

    if (email.length < 4) {
      alert('email을 입력해주세요.');
      txtEmail.focus();
      return;
    }
    if (password.length < 8) {
      alert('비밀번호를 입력해주세요.');
      txtPassword.focus();
      return;
    }

    auth.signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    if (errorCode === 'auth/wrong-password') {
      alert('비밀번호를 잘못입력하였습니다.');
      e.preventDefault();
      return;
    }
    if(errorCode === 'auth/network-request-failed'){
      alert('네트워크 에러입니다.');
      e.preventDefault();
      return;
    }
    if(errorCode === 'auth/user-not-found'){
      alert('회원님을 찾을 수 없습니다. 회원가입을 해주세요.');
      $("#register-form").delay(100).fadeIn(100);
      $("#facebook-form").delay(100).fadeIn(100);
   		$("#login-form").fadeOut(100);
  		$('#login-form-link').removeClass('active');
  		$('#register-form-link').addClass('active');
  		e.preventDefault();
      return;
    }

    console.log(error);

  });
});

$(document).ready(function(){
  $("#facebookButton").click(function(){
    var provider = new firebase.auth.FacebookAuthProvider();
    platform = 2;
    provider.addScope('email');
    provider.addScope('user_birthday');
    provider.setCustomParameters({
      'display': 'popup'
    });

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      console.log("TOKEN: "+ token);
      // The signed-in user info.
      var user = result.user; // S로 출력

      // TODO: Move to MainPage
      //window.location = './main/doctor_main.html';

      $.ajax({
        url: 'http://igrus.mireene.com/medifofo_web/php/doctor_register.php',
        type: 'post',
        dataType: 'text',
        data: {
          token_id : token,
          platform : 2,
          doctor_name : user.displayName,
          doctor_phone : $('#doctor_phone').val(),
          hospital_name : $('#hospital_name').val(),
        },
        success: function(data){
          console.log(data);
        }
      });

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorCode);
      console.log(errorMessage);
    });


  });
});
