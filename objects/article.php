<?php
class Article{
    // database connection and table name
    private $conn;
    private $table_name = "tbl_article";

    // object properties
    public $id;
    public $title;
    public $description;
    public $created;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
    // create 
    function create(){

        // query to insert record
        $query = "INSERT INTO 
                " . $this->table_name . "
            SET 
                title=:title, description=:description, created=:created";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // posted values
        $this->title=htmlspecialchars(strip_tags($this->title));
        $this->description=htmlspecialchars(strip_tags($this->description));

        // bind values
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":created", $this->created);

        // execute query
        if($stmt->execute()){
            return true;
        }else{
            echo "<pre>";
            print_r($stmt->errorInfo());
            echo "</pre>";

            return false;
        }
    }
    // read 
    function readAll(){

        // select all query
        $query = "SELECT 
                id, title, description, created 
            FROM 
                " . $this->table_name . "
            ORDER BY 
                id ASC";

        // prepare query statement
        $stmt = $this->conn->prepare( $query );

        // execute query
        $stmt->execute();

        return $stmt;
    }

    // used when filling up the update  form
    function readOne(){

        // query to read single record
          $query = "SELECT 
                id, title, description, created 
            FROM 
                " . $this->table_name . "
            WHERE 
                title like '%". $this->title ."%'  and description like '%". $this->description ."%'";

        // prepare query statement
        $stmt = $this->conn->prepare( $query );

        // bind id of  to be updated
        //$stmt->bindParam(1, $this->id);

        // execute query
        $stmt->execute();

     
		
		return $stmt;
    }
    // update the 
    function update(){

        // update query
        $query = "UPDATE 
                " . $this->table_name . "
            SET 
                title = :title, 
                description = :description 
            WHERE
                id = :id";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // posted values
        $this->name=htmlspecialchars(strip_tags($this->title));
        $this->description=htmlspecialchars(strip_tags($this->description));

        // bind new values
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':id', $this->id);

        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
    // delete the 
    function delete(){

        // delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // bind id of record to delete
        $stmt->bindParam(1, $this->id);

        // execute query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
}
?>