<?php

$connection = mysqli_connect('localhost', 'root', '');

if(!$connection){
  echo 'Not connected to server';
}

$email_id = $_POST['email_id'];
$doctor_name = $_POST['doctor_name'];
$doctor_phone = $_POST['doctor_phone'];
$hospital_name = $_POST['hospital_name'];

if(isset($_POST['email_id']) && isset($_POST['platform']) && isset($_POST['doctor_name']) && isset($_POST['doctor_phone']) && isset($_POST['hospital_id'])) { // signup for firebase

	$query = " INSERT INTO medi_doctor(email_id, doctor_name, doctor_phone, hospital_name)
		VALUES('$email_id', '$doctor_name', '$doctor_phone', '$hospital_name') ";

  if(!mysqli_query($connection, $query)){
    echo 'Not inserted';
  }else{
    echo 'Inserted'
  }

  header("refresh:2; url=doctor_form.html");

} else {
	echo "check postdata";
}
?>
