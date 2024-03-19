<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

$recieved_data = json_decode(file_get_contents("php://input"),true);

	include('assets/inc/env.php'); 
	$conn = new mysqli( $servername, $username, $password, $dbname );

	if ( $conn->connect_error ) {
		die( "Connection failed: " . $conn->connect_error );
	}
	else {

		foreach ($recieved_data as $dbentry) {
			$sql = "INSERT INTO `results` (name, email, shirtsize)	VALUES ('{$dbentry['name']}', '{$dbentry['email']}', '{$dbentry['shirtsize']}');";
	
			if ( $conn->query( $sql ) === true ) {
				print "New record created successfully";
			} else {
				print "Error: " . $sql . "<br>" . $conn->error;
			}
		}
		
	}
	

?>