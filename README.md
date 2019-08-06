OVERVIEW

 sam 

 
This is a simple mini blog(React Frontend Mini Project) developed based on the task requirements as follows.

Task:
As a technical assessment, we will request you to make a private mini-blog. literally, it is a very small blog that has only the following required CRUD features:
•	Write an article
•	List all articles that you wrote
•	Read articles
•	Update articles
•	Delete articles

Rather than using the fake REST API, I have developed a simple backend REST APIs using PHP,MySQL and front end parts have been fully coded using React. 


Installation Requirements.

1. Install Apache & MySQL(preferrably XAMPP/MAMP) and make sure it is up and running before running the app.
2. Clone the project inside Apache htdocs folder.
3. Create and Import the database(db_techtest.sql) into the MySQL.
4. Please change the username and password for the imported database in backend/config/database.php file.
5. Install Yarn(Javascript Package Manager)

Running the app locally.

Note: Please make sure all above installation requirements are met for smooth running of the app.

1. Go to the project folder inside Apache htdocs folder.
2. Run the command yarn install
3. Run the command yarn run build
4. Run the command yarn start.
5. The application should automatically open a page at http://localhost:3000/ and should display the Search, the List and the option to add an article.
6. Once the application is running, you can try adding an article, viewing in the list, searching and finally deleting as well.



