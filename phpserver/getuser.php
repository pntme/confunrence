<?php
header("Access-Control-Allow-Origin: *");
include 'db.php';
$id = $_GET['_id'];
$query = mysql_query("select * from interests where `id` = '$id'");
$data = array();
while ($result = mysql_fetch_assoc($query)) {
	$data[] = $result;
}
echo json_encode($data);

?>