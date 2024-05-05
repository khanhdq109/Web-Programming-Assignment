<?php 
    require_once __DIR__ . '/../connect.php/';

    class ReviewModel {
        private $con;

        public function __construct() {
            $database = new Connect();
            $this->con = $database->connect();
        }

        // input: user_id, book_id, rating, review
        // output: bool
        public function create($params) {
            $user_id = intval($params('user_id'));
            $book_id = intval($params['book_id']);
            $rating = intval($params['rating']);
            $review = mysqli_real_escape_string($this->con, $params['review']);

            $query = "INSERT INTO REVIEW
                    (user_id, book_id, rating, review)
                    VALUES
                    ($user_id, $book_id, $rating, $review)";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: review_id
        // output: a matched review
        public function read($params) {
            $review_id = intval($params['review_id']);

            $query = "SELECT * FROM REVIEW WHERE review_id = $review_id";
            $result = mysqli_query($this->con, $query);

            $review = null;
            if ($result && mysqli_num_rows($result) > 0) {
                $review = mysqli_fetch_assoc($result);
            }

            return $review;
        }

        // input: review_id, rating, review
        // output: bool
        public function update($params) {
            $review_id = intval($params['review_id']);
            $rating = intval($params['rating']);
            $review = mysqli_real_escape_string($this->con, $params['review']);

            $query = "UPDATE REVIEW SET
                    rating = $rating,
                    review = $review
                    WHERE
                    review_id = $review_id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: review_id
        // output: bool
        public function delete($params) {
            $review_id = intval($params['review_id']);

            $query = "DELETE FROM REVIEW WHERE review_id = $review_id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        public function __destruct() {
            $this->con->close();
        }
    }
?>