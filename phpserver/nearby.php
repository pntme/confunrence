<?php
header("Access-Control-Allow-Origin: *");
include 'db.php';
$query = mysql_query("select * from interests");
$data = array();
while ($result = mysql_fetch_assoc($query)) {
	$data[] = $result;
}
echo json_encode($data);

?>