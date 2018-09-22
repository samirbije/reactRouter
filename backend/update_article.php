<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
// include database and object files
include_once 'config/database.php';
include_once 'objects/article.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$article = new Article($db);

// get id of article to be edited
$data = json_decode(file_get_contents("php://input"));

// set ID property of article to be edited
$article->id = $data->id;

// set article property values
$article->title = $data->title;
$article->description = $data->description;

// update the product
if($data->title && $data->description ){
	$article->update();
	header("HTTP/1.1 200 OK");
	 $success= "article was updated.";
	  echo json_encode(array('message' => $success));
   // echo "article was updated.";
}

// if unable to update the product, tell the user
else{
   header( 'HTTP/1.1 400 BAD REQUEST' );
    $err='Field should not be blank';
    echo json_encode(array('message' => $err));
}
?>