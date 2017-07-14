<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include 'db.php';
$_id = $_GET['_id'];
$lat = $_GET['lat'];
$lng = $_GET['lng'];
$user_name = $_GET['user_name'];
$company = $_GET['company'];
$location = $_GET['location'];
$profile_picture = $_GET['profile_picture'];
$sql1 = "select * from `interests` where `login_id`='$_id'";
$result = mysql_query($sql1);
if (mysql_num_rows($result) == 0) {
	$sql = "insert into interests(`id`,`login_id`,`lat`, `lng`, `company`, `location`, `profile_picture`, `user_name`) values('','$_id','$lat', '$lng', '$company', '$location' , '$profile_picture', '$user_name')";
	$query = mysql_query($sql);
	if ($query) {
		echo 1;
	} else {
		echo 0;
	}

} else {
	$sql = "UPDATE interests SET `lat`='$lat',`lng`='$lng', `company`='$company', `location`='$location', `profile_picture`='$profile_picture', `user_name` ='$user_name' WHERE `login_id`='$_id'";
	$query = mysql_query($sql);
	if ($query) {
		echo 1;
	} else {
		echo 0;
	}

}

?>