<?php 
    require_once __DIR__ . '/../connect.php/';

    class CartModel {
        private $con;

        public function __construct() {
            $database = new Connect();
            $this->con = $database->connect();
        }

        // input: user_id, book_id, quantity
        // output: bool
        public function create($params) {
            $user_id = intval($params['user_id']);
            $book_id = intval($params['book_id']);
            $quantity = intval($params['quantity']);

            $tmp = array(
                'user_id' => $user_id,
                'book_id' => $book_id
            );
            $existed = $this->read($tmp);

            if ($existed) {
                $newQuantity = $existed['quantity'] + $quantity;
                $tmp = array(
                    'book_id' => $book_id,
                    'quantity' => $newQuantity
                );
                return $this->update($tmp);
            }
            else {
                $query = "INSERT INTO CART
                        (user_id, book_id, quantity)
                        VALUES
                        ($user_id, $book_id, $quantity)";
                $result = mysqli_query($this->con, $query);

                return $result ? true : false;
            }
        }

        // input: user_id, book_id
        // output: list of item in matched user's cart
        public function read($params) {
            $user_id = intval($params['book_id']);

            $query = "SELECT * FROM CART WHERE user_id = $user_id";
            $result = mysqli_query($this->con, $query);

            $items = null;
            if ($result && mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $items[] = $row;
                }
            }
            
            return $items;
        }

        // input: book_id, quantity
        // output: bool
        public function update($params) {
            $book_id = intval($params['book_id']);
            $quantity = intval($params['quantity']);

            $query = "UPDATE CART SET quantity = $quantity WHERE book_id = $book_id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        public function delete($book_id) {
            $book_id = intval($book_id);

            $query = "DELETE FROM CART WHERE book_id = $book_id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        public function __destruct() {
            $this->con->close();
        }
    }
?>