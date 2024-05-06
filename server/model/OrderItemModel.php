<?php 
    require_once __DIR__ . '/../connect.php';
    require_once __DIR__ . '/BookModel.php';

    class OrderItemModel {
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

            $bookModel = new BookModel();
            $book = $bookModel->read(['book_id' => $book_id]);
            if (!$book) {
                return false;
            }

            $price = $quantity * $book['price'];
            $price = number_format($price, 2, '.', '');

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

        // input: order_id
        // output: list of all matched order item
        public function readByOrderId($params) {
            $order_id = intval($params['order_id']);

            $query = "SELECT * FROM ORDER_ITEM WHERE order_id = $order_id";
            $result = mysqli_query($this->con, $query);

            $items = [];
            if ($result && mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $items[] = $row;
                }
            }

            return $items;
        }

        // input: id, book_id, order_id, quantity
        // output: bool
        public function update($params) {
            $id = intval($params['id']);
            $book_id = intval($params['book_id']);
            $order_id = intval($params['order_id']);
            $quantity = intval($params['quantity']);

            $query = "UPDATE ORDER_ITEM SET 
                    book_id = '$book_id', 
                    order_id = '$order_id', 
                    quantity = '$quantity'
                    WHERE 
                    id = '$id'";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: id
        // output: bool
        public function delete($params) {
            $id = intval($params['id']);

            $query = "DELETE FROM ORDER_ITEM WHERE id = '$id'";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        public function __destruct() {
            $this->con->close();
        }
    }
?>
