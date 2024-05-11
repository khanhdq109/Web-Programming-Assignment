<?php 
    require_once __DIR__ . '/../connect.php';

    class CategoryModel {
        private $con;

        public function __construct() {
            $database = new Connect();
            $this->con = $database->connect();
        }

        // input: book_id, category_name
        // output: bool
        public function create($params) {
            $book_id = intval($params['book_id']); 
            $category_name = mysqli_real_escape_string($this->con, $params['category_name']);

            $query = "INSERT INTO CATEGORY
            (book_id, category_name)
            VALUES
            ($book_id, '$category_name')";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: book_id, category_name
        // output: a matched result
        public function read($params) {
            $book_id = intval($params['book_id']);
            $category_name = mysqli_real_escape_string($this->con, $params['category_name']);

            $query = "SELECT * FROM CATEGORY WHERE book_id = $book_id AND category_name = '$category_name'";
            $result = mysqli_query($this->con, $query);

            $book = null;
            if ($result && mysqli_num_rows($result) > 0) {
                $book = mysqli_fetch_assoc($result);
            }
            return $book;
        }

        public function readAll() {
            $query = "SELECT * FROM CATEGORY";
            $result = mysqli_query($this->con, $query);
            $categories = [];
            if ($result && mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $categories[] = $row;
                }
            }
            return $categories;
        }

        // input: book_id
        // output: list of all matched categories
        public function readByBookId($params) {
            $book_id = intval($params['book_id']);

            $query = "SELECT * FROM CATEGORY WHERE book_id = $book_id";
            $result = mysqli_query($this->con, $query);

            $categories = [];
            if ($result && mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $categories[] = $row;
                }
            }
            return $categories;
        }

        // intput: category_name
        // output: list of all matched books
        public function readByCategory($params) {
            $category_name = mysqli_real_escape_string($this->con, $params['category_name']);

            $query = "SELECT * FROM CATEGORY WHERE category_name = '$category_name'";
            $result = mysqli_query($this->con, $query);

            $books = [];
            if ($result && mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $books[] = $row;
                }
            }
            return $books;
        }

        // input: book_id, category_name
        // output: bool
        public function delete($params) {
            $book_id = intval($params['book_id']); 
            $category_name = mysqli_real_escape_string($this->con, $params['category_name']);

            $query = "DELETE FROM CATEGORY WHERE book_id = $book_id AND category_name = '$category_name'";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        public function __destruct() {
            $this->con->close();
        }
    }
?>