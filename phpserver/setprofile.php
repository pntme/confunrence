<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include 'db.php';
$_id = $_GET['_id'];
$lat = $_GET['lat'];
$lng = $_GET['lng'];
$company = $_GET['company'];
$location = $_GET['location'];
$sql1 = "select * from `interests` where `login_id`='$_id'";
$result = mysql_query($sql1);
if (mysql_num_rows($result) == 0) {
	$sql = "insert into interests(`id`,`login_id`,`lat`, `lng`, `company`, `location`) values('','$_id','$lat', '$lng', `$company`, `$location`)";
	$query = mysql_query($sql);
	if ($query) {
		echo 1;
	} else {
		echo 0;
	}

} else {
	$sql = "UPDATE interests SET `lat`='$lat',`lng`='$lng', `company`='$company', `location`='$location'   WHERE `login_id`='$_id'";
	$query = mysql_query($sql);
	if ($query) {
		echo 1;
	} else {
		echo 0;
	}

}

?>