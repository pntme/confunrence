<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "hobbies";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
} else{
	echo 'connected';
}

$sql = "SELECT * FROM `TABLE 1` WHERE 1";
$result = $conn->query($sql);
$data=array();
if ($result->num_rows > 0) {
     // output data of each row
     while($row = $result->fetch_assoc()) {
        echo json_encode($row);
        echo ',';
     }


} else {
     echo "0 results";
}

$conn->close();
?>  