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

    auth.onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        console.log(firebaseUser);
        goLoginPage();
      }else{
        alert("ERROR: " + errorMessage);
        console.log('not logged in');
        return;
      }
    });
    });
  });
});

function goLoginPage(){
  location.href = "./doctor_login.html";
}
