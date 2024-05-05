<?php 
    require_once __DIR__ . '/../connect.php';

    class BookModel {
        private $con;

        public function __construct() {
            $database = new Connect();
            $this->con = $database->connect();
        }

        // input: book_name, author, publisher, page_number, publication_date, language, descriptioin, price, book_cover, img_url
        // output: bool
        public function create($params) {
            $book_name = mysqli_real_escape_string($this->con, $params['book_name']);
            $author = mysqli_real_escape_string($this->con, $params['author']);
            $publisher = mysqli_real_escape_string($this->con, $params['publisher']);
            $page_number = intval($params['page_number']);
            $publication_date = mysqli_real_escape_string($this->con, $params['publication_date']);
            $language = mysqli_real_escape_string($this->con, $params['language']);
            $description = mysqli_real_escape_string($this->con, $params['description']);
            $price = number_format(floatval($params['price']), 2, '.', '');
            $book_cover = mysqli_real_escape_string($this->con, $params['book_cover']);
            $img_url = mysqli_real_escape_string($this->con, $params['img_url']);

            $query = "INSERT INTO BOOK 
                    (book_name, author, publisher, page_number, publication_date, language, description, price, book_cover, img_url)
                    VALUES
                    ('$book_name', '$author', '$publisher', $page_number, '$publication_date', '$language', '$description', $price, '$book_cover', '$img_url')";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: book_id
        // output: a matched book
        public function read($params) {
            $book_id = intval($params['book_id']);

            $query = "SELECT * FROM BOOK WHERE book_id = $book_id";
            $result = mysqli_query($this->con, $query);

            $book = null;
            if ($result && mysqli_num_rows($result) > 0) {
                $book = mysqli_fetch_assoc($result);
            }

            return $book;
        }

        // input: book_id, book_name, author, publisher, page_number, publication_date, language, descriptioin, price, book_cover, img_url
        // output: bool
        public function update($params) {
            $book_id = intval($params['book_id']);
            $book_name = mysqli_real_escape_string($this->con, $params['book_name']);
            $author = mysqli_real_escape_string($this->con, $params['author']);
            $publisher = mysqli_real_escape_string($this->con, $params['publisher']);
            $page_number = intval($params['page_number']);
            $publication_date = mysqli_real_escape_string($this->con, $params['publication_date']);
            $language = mysqli_real_escape_string($this->con, $params['language']);
            $description = mysqli_real_escape_string($this->con, $params['description']);
            $price = number_format(floatval($params['price']), 2, '.', '');
            $book_cover = mysqli_real_escape_string($this->con, $params['book_cover']);
            $img_url = mysqli_real_escape_string($this->con, $params['img_url']);

            $query = "UPDATE BOOK SET
                    book_name = '$book_name',
                    author = '$author',
                    publisher = '$publisher',
                    page_number = $page_number,
                    publication_date = '$publication_date',
                    language = '$language',
                    description = '$description',
                    price = $price,
                    book_cover = '$book_cover',
                    img_url = '$img_url'
                    WHERE 
                    book_id = '$book_id'";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: book_id
        // output: bool
        public function delete($params) {
            $book_id = intval($params['book_id']); 

            $query = "DELETE FROM BOOK WHERE book_id = $book_id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        public function __destruct() {
            $this->con->close();
        }
    }
?>
