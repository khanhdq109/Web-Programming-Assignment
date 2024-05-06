<?php 
    require_once __DIR__ . '/../connect.php';
    require_once __DIR__ . '/OrderItemModel.php';

    class OrdersModel {
        private $con;

        public function __construct() {
            $database = new Connect();
            $this->con = $database->connect();
        }

        // input: user_id, name, email, address, phone_number, total_amount
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

            // Calculate total amount of price
            if ($result) {
                $order_id = mysqli_insert_id($this->con);
            } 
            else {
                return false;
            }

            $orderItemModel = new OrderItemModel();
            $orderItems = $orderItemModel->readByOrderId(['order_id' => $order_id]);
            if (!empty($orderItems)) {
                foreach ($orderItems as $item) {
                    $total_amount += $item['price'];
                }
            }

            $query = "UPDATE ORDERS SET
                    total_amount = $total_amount
                    WHERE order_id = $order_id";
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

        // input: order_id, user_id, name, email, address, phone_number, status_order
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
        public function delete($params) {
            $order_id = intval($params['order_id']);

            $query = "DELETE FROM ORDERS WHERE order_id = $order_id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        public function __destruct() {
            $this->con->close();
        }
    }
?>