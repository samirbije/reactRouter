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

// prepare article object
$article = new Article($db);

// get id of article to be edited
$data = json_decode(file_get_contents("php://input"));

// set ID property of article to be edited
// set article property values
$article->title = $data->title;
$article->description = $data->description;

// read the details of article to be edited
$stmt = $article->readOne();

// create array
//$article[] = array(
   // //"id" =>  $article->id,
   // "title" => $article->title,
   // "description" => $article->description
//);

// query article
//$stmt = $article->readAll();
$num = $stmt->rowCount();
$row = $stmt->fetchall(PDO::FETCH_ASSOC);
echo json_encode($row);
?>