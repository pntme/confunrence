<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include 'db.php';
$interest = $_GET['interest'];
$user_id = $_GET['user_id'];
$sql1 = "select * from `interests` where `login_id`='$user_id'";
$result = mysql_query($sql1);

if (mysql_num_rows($result) == 0) {
	$sql = "insert into interests(`id`,`login_id`,`interest`) values('','$user_id','$interest')";
	$query = mysql_query($sql);
	if ($query) {
		echo 1;
	} else {
		echo 0;
	}

} else {
	$sql = "UPDATE interests SET `interest`= '$interest' WHERE `login_id`='$user_id'";
	$query = mysql_query($sql);
	if ($query) {
		echo 1;
	} else {
		echo 0;
	}

}

?>