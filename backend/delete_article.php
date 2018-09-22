<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
// include database and object file
include_once 'config/database.php';
include_once 'objects/article.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare article object
$article = new Article($db);

// get article id
$data = json_decode(file_get_contents("php://input"));

// set article id to be deleted
$article->id = $data->id;

// delete the article
if($article->delete()){
    echo "article was deleted.";
}

// if unable to delete the article
else{
    echo "Unable to delete object.";
}
?>