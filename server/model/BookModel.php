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
            $defaultParams = [
                'book_name' => 'Book Name',
                'author' => 'Author Name',
                'publisher' => 'Publisher Name',
                'page_number' => 0,
                'publication_date' => '2024-01-01',
                'language' => 'English',
                'description' => 'Description',
                'price' => 0.00,
                'book_cover' => 'Hardcover',
                'img_url' => 'default.jpg'
            ];
            $params = array_merge($defaultParams, $params);

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

        // input: None
        // output: list of all books
        public function readAll($params) {
            $query = "SELECT * FROM BOOK";
            $result = mysqli_query($this->con, $query);

            $books = [];
            if ($result && mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $books[] = $row;
                }
            }

            return $books;
        }

        // input: book_name
        // output: matched books list
        public function readBookByName($params) {
            $book_name = mysqli_real_escape_string($this->con, $params['book_name']);

            $query = "SELECT * FROM BOOK WHERE book_name LIKE '%$book_name%'";
            $result = mysqli_query($this->con, $query);

            $books = [];
            if ($result && mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $books[] = $row;
                }
            }

            return $books;
        }

        // input: book_id, book_name, author, publisher, page_number, publication_date, language, descriptioin, price, book_cover, img_url
        // output: bool
        public function update($params) {
            $book_id = intval($params['book_id']);
            $updateFields = [];
            foreach($params as $key => $value) {
                if ($key !== 'book_id') {
                    $escapedValue = mysqli_real_escape_string($this->con, $value);
                    if (is_numeric($value)) {
                        if ($key == 'price') {
                            $escapedValue = number_format(floatval($value), 2, '.', '');
                        }
                        else {
                            $escapedValue = intval($value);
                        }
                    }
                    $updateFields[] = "$key = '$escapedValue'";
                }
            }

            $query = "UPDATE BOOK SET " . implode(', ', $updateFields) . " WHERE book_id = $book_id";
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
