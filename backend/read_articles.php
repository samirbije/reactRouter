<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
// include database and object files
include_once 'config/database.php';
include_once 'objects/article.php';

// instantiate database and article object
$database = new Database();
$db = $database->getConnection();

// initialize object
$article = new Article($db);

// query article
$stmt = $article->readAll();
$num = $stmt->rowCount();
$row = $stmt->fetchall(PDO::FETCH_ASSOC);
echo json_encode($row);
?>