<?php 
    require_once __DIR__ . '/../connect.php/';
    require_once __DIR__ . 'BookModel.php';

    class Order_itemModel {
        private $con;

        public function __construct() {
            $database = new Connect();
            $this->con = $database->connect();
        }

        // input: book_id, order_id, quantity
        // output: bool
        public function create($params) {
            $book_id = intval($params['book_id']);
            $order_id = intval($params['order_id']);
            $quantity = intval($params['quantity']);

            $tmp = array(
                'book_id' => $book_id
            );
            $book = new BookModel();
            $book_price = intval($book->read($tmp)['price']);
            $price = $quantity * $book_price;

            $query = "INSERT INTO ORDER_ITEM
                    (book_id, order_id, quantity, price)
                    VALUES
                    ($book_id, $order_id, $quantity, $price)";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: id
        // output: a matched order item
        public function read($params) {
            $id = intval($params['id']);

            $query = "SELECT * FROM ORDER_ITEM WHERE id = $id";
            $result = mysqli_query($this->con, $query);

            $item = null;
            if ($result && mysqli_num_rows($result) > 0) {
                $item = mysqli_fetch_assoc($result);
            }

            return $item;
        }

        // input: id, book_id, order_id, quantity, price
        // output: bool
        public function update($params) {
            $id = intval($params['id']);
            $book_id = intval($params['book_id']);
            $order_id = intval($params['order_id']);
            $quantity = intval($params['quantity']);
            $price = intval($params['price']);

            $query = "UPDATE ORDER_ITEM SET
                    book_id = $book_id,
                    order_id = $order_id,
                    quantity = $quantity,
                    price = $price
                    WHERE
                    id = $id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: id
        // output: bool
        public function delete($params) {
            $id = intval($params['id']);

            $query = "DELTE FROM ORDER_ITEM WHERE id = $id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        public function __destruct() {
            $this->con->close();
        }
    }
?>