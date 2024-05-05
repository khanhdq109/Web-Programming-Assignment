<?php 
    require_once __DIR__ . '/../connect.php/';

    class LikedModel {
        private $con;

        public function __construct() {
            $database = new Connect();
            $this->con = $database->connect();
        }

        // input: user_id, book_id
        // output: bool
        public function create($params) {
            $user_id = intval($params['user_id']);
            $book_id = intval($params['book_id']);

            $query = "INSERT INTO LIKED
                    (user_id, book_id)
                    VALUES
                    ($user_id, $book_id)";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: user_id
        // output: list of all liked books
        public function read($params) {
            $user_id = intval($params['user_id']);

            $query = "SELECT * FROM LIKED WHERE user_id = $user_id";
            $result = mysqli_query($this->con, $query);

            $books = [];
            if ($result && mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $books[] = $row;
                }
            }

            return $books;
        }

        // input: None
        // output: true
        public function update($params) {
            return true;
        }

        // input: user_id, book_id
        // output: bool
        public function delete($params) {
            $user_id = intval($params['user_id']);
            $book_id = intval($params['bookk_id']);

            $query = "DELETE FROM LIKED WHERE user_id = $user_id AND book_id = $book_id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        public function __destruct() {
            $this->con->close();
        }
    }
?>