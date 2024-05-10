<?php 
    require_once __DIR__ . '/../connect.php';

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

        // input: user_id, book_id
        // output: a matched result
        public function read($params) {
            $user_id = intval($params['user_id']);
            $book_id = intval($params['book_id']);

            $query = "SELECT * FROM LIKED WHERE user_id = $user_id AND book_id = $book_id";
            $result = mysqli_query($this->con, $query);

            $book = null;
            if ($result && mysqli_num_rows($result) > 0) {
                $book = mysqli_fetch_assoc($result);
            }

            return $book;
        }

        // intput: user_id
        // output: list of all liked books
        public function readByUserId($params) {
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

        // input: book_id
        // output: list of all users like the book
        public function readByBookId($params) {
            $book_id = intval($params['book_id']);

            $query = "SELECT * FROM LIKED WHERE book_id = $book_id";
            $result = mysqli_query($this->con, $query);

            $users = [];
            if ($result && mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $users[] = $row;
                }
            }

            return $users;
        }

        // input: user_id, book_id
        // output: bool
        public function delete($params) {
            $user_id = intval($params['user_id']);
            $book_id = intval($params['book_id']);

            $query = "DELETE FROM LIKED WHERE user_id = $user_id AND book_id = $book_id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        public function __destruct() {
            $this->con->close();
        }
    }
?>