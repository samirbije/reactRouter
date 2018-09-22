<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
// get database connection
include_once 'config/database.php';
$database = new Database();
$db = $database->getConnection();

// instantiate  object
include_once 'objects/article.php';
$article = new Article($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));
// set article property values
$article->title = $data->title;
$article->description = $data->description;
$article->created = date('Y-m-d H:i:s');

// create the article
if($data->title && $data->description ){
	$article->create();
    $success= "article was created.";
    //$msg='article not created';
    //echo json_encode(array('failure' => $msg));
    echo (json_encode($article));
}

// if unable to create the article, tell the user
else{
	header( 'HTTP/1.1 400 BAD REQUEST' );
    $err='Field should not be blank';
    echo json_encode(array('message' => $err));
    //echo (json_encode($error));
    //echo "Unable to create article.";
}
?>