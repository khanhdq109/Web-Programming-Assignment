<?php 
    require_once __DIR__ . '/../connect.php';
    require_once __DIR__ . '/OrderItemModel.php';

    class OrdersModel {
        private $con;

        public function __construct() {
            $database = new Connect();
            $this->con = $database->connect();
        }

        // input: user_id, name, email, address, phone_number
        // output: bool
        public function create($params) {
            $user_id = intval($params['user_id']);
            $name = mysqli_real_escape_string($this->con, $params['name']);
            $email = mysqli_real_escape_string($this->con, $params['email']);
            $address = mysqli_real_escape_string($this->con, $params['address']);
            $phone_number = mysqli_real_escape_string($this->con, $params['phone_number']);
            $total_amount = number_format(floatval(0), 2, '.', '');

            $query = "INSERT INTO ORDERS
                    (user_id, name, email, address, phone_number, total_amount)
                    VALUES
                    ('$user_id', '$name', '$email', '$address', '$phone_number', $total_amount)";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: order_id
        // output: a matched order
        public function read($params) {
            $order_id = intval($params['order_id']);

            $query = "SELECT * FROM ORDERS WHERE order_id = $order_id";
            $result = mysqli_query($this->con, $query);

            $order = null;
            if ($result && mysqli_num_rows($result)) {
                $order = mysqli_fetch_assoc($result);
            }

            return $order;
        }

        // input: None
        // output: list of all orders
        public function readAll($params) {
            $query = "SELECT * FROM ORDER";
            $result = mysqli_query($this->con, $query);

            $orders = [];
            if ($result && mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $orders[] = $row;
                }
            }

            return $orders;
        }

        // input: user_id
        // output: list of all user's orders
        public function readByUserId($params) {
            $user_id = intval($params['user_id']);

            $query = "SELECT * FROM ORDER WHERE user_id = $user_id";
            $result = mysqli_query($this->con, $query);

            $orders = [];
            if ($result && mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $orders[] = $row;
                }
            }

            return $orders;
        }

        // input: status_order
        // output: bool
        public function update($params) {
            $order_id = intval($params['order_id']);
            $updateFields = [];
            foreach($params as $key => $value) {
                if ($key !== 'order_id') {
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

            $query = "UPDATE ORDERS SET " . implode(', ', $updateFields) . " WHERE order_id = $order_id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: order_id
        // output: bool
        public function updateTotalAmount($params) {
            $order_id = intval($params['order_id']);
            $total_amount = number_format(floatval(0), 2, '.', '');

            $orderItemModel = new OrderItemModel();
            $orderItems = $orderItemModel->readByOrderId(['order_id' => $order_id]);
            if (!empty($orderItems)) {
                foreach ($orderItems as $item) {
                    $total_amount += $item['price'];
                }
            }

            $query = "UPDATE ORDERS SET
                    total_amount = $total_amount
                    WHERE
                    order_id = $order_id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: order_id
        // output: bool
        public function delete($params) {
            $order_id = intval($params['order_id']);

            $query = "DELETE FROM ORDERS WHERE order_id = $order_id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: None
        // output: id from last insert query
        public function lastInsertId($params = null) {
            return mysqli_insert_id($this->con);
        }

        public function __destruct() {
            $this->con->close();
        }
    }
?>