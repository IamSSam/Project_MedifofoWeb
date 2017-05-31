$(function() {
  moveLoginTab();
  moveRegisterTab();
});

function moveLoginTab(){
  $('#login-form-link').click(function(e) {
    $("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
}

function moveRegisterTab(){
  $('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
}

$(document).ready(function(){
  $("#registerButton").click(function(){
    const txtName = document.getElementById('name');
    const txtEmail = document.getElementById('email');
    const txtPassword = document.getElementById('password');

    const name = txtName.value;
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();

    if(name == null || name.length == 0){
      alert('이름을 입력해주세요.');
      txtName.focus();
      return;
    }
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

    console.log(error);

    });
  });
});

$(document).ready(function(){
  $("#loginButton").click(function(){
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
      return;
    }
    if(errorCode === 'auth/network-request-failed'){
      alert('네트워크 에러입니다.');
      return;
    }
    if(errorCode === 'auth/user-not-found'){
      alert('회원님을 찾을 수 없습니다. 회원가입을 해주세요.');
      $("#register-form").delay(100).fadeIn(100);
   		$("#login-form").fadeOut(100);
  		$('#login-form-link').removeClass('active');
  		$('#register-form-link').addClass('active');
  		e.preventDefault();
      return;
    }

    console.log(error);

    });
  });
});

firebase.auth().onAuthStateChanged(user => {
  if(user) {
    console.log(user);

    $("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$('#login-form-link').addClass('active');
		//e.preventDefault();

    const txtEmail = document.getElementById('user_email');
    const txtPassword = document.getElementById('user_password');

    const email = txtEmail.value;
    const password = txtPassword.value;

    if (email.length < 4) {
      alert('email을 입력해주세요.');
      txtEmail.focus();
      return;
    }else if (password.length < 8) {
      alert('비밀번호를 입력해주세요.');
      txtPassword.focus();
      return;
    }else{
      window.location = 'doctor_main.html';
    }

  }else{
    console.log('not logged in');
  }
});

function checkInput(){

}
