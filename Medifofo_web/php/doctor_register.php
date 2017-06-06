<?php

/**
 * @author Ravi Tamada
 * @link http://www.androidhive.info/2012/01/android-login-and-registration-with-php-mysql-and-sqlite/ Complete tutorial
 */
header("Content-Type:application/json; charset=utf-8");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');

// json response array
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'igrus');
define('DB_PASSWORD', 'Dkdlrmfntm123');
define('DB_DATABASE', 'igrus');

if(isset($_POST['token_id']) && isset($_POST['platform']) && isset($_POST['doctor_name']) && isset($_POST['doctor_phone']) && isset($_POST['hospital_name'])) { // signup for firebase

	$connection = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);

	$result = mysqli_query($connection,"INSERT INTO medi_doctor(token_id,platform,doctor_name,doctor_phone,hospital_name)
		values('".$_POST['token_id']."','".$_POST['platform']."','".$_POST['doctor_name']."'
		,'".$_POST['doctor_phone']."' ,'".$_POST['hospital_name']."'  )");

	$return_arr = Array();
	$result = mysqli_query($connection,"SELECT * FROM medi_doctor WHERE email_id = '".$_POST['token_id']."'");
	while ($row = mysqli_fetch_array($result)) {
		$row_array['id'] = $row['id'];
		$row_array['token_id'] = $row['token_id'];
		$row_array['platform'] = $row['platform'];
		$row_array['doctor_name'] = $row['doctor_name'];
		$row_array['doctor_phone'] = $row['doctor_phone'];
		$row_array['hospital_name'] = $row['hospital_name'];
		array_push($return_arr,$row_array);
	}

	echo json_encode($return_arr,JSON_UNESCAPED_UNICODE);

} else if(isset($_POST['email_id']) && isset($_POST['platform']) && isset($_POST['doctor_name']) && isset($_POST['doctor_phone']) && isset($_POST['hospital_name'])) { // signup for firebase

	$connection = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);

	$result = mysqli_query($connection," INSERT INTO medi_doctor( email_id, platform, doctor_name, doctor_phone, hospital_name )
		values('".$_POST['email_id']."', '".$_POST['platform']."', '".$_POST['doctor_name']."', '".$_POST['doctor_phone']."', '".$_POST['hospital_name']."') ");

	$return_arr = Array();
	$result = mysqli_query($connection,"SELECT * FROM medi_doctor WHERE email_id = '".$_POST['email_id']."'");
	while ($row = mysqli_fetch_array($result)) {
		$row_array['id'] = $row['id'];
    $row_array['platform'] = $row['platform'];
		$row_array['email_id'] = $row['email_id'];
		$row_array['doctor_name'] = $row['doctor_name'];
		$row_array['doctor_phone'] = $row['doctor_phone'];
		$row_array['hospital_name'] = $row['hospital_name'];
		array_push($return_arr,$row_array);
	}

	echo json_encode($return_arr,JSON_UNESCAPED_UNICODE);

} else {
	echo "check postdata";
}
?>
