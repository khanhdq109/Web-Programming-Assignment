<?php 
    require_once __DIR__ . '/../connect.php/';

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
            $total_amount = intval($params['total_amount']);

            $query = "INSERT INTO ORDERS
                    (user_id, name, email, address, phone_number, total_amount)
                    VALUES
                    ($user_id, $name, $email, $address, $phone_number, $total_amount)";
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

        // input: order_id, user_id, name, email, address, phone_number, total_amount, status_order
        // output: bool
        public function update($params) {
            $order_id = intval($params['order_id']);
            $user_id = intval($params['user_id']);
            $name = mysqli_real_escape_string($this->con, $params['name']);
            $email = mysqli_real_escape_string($this->con, $params['email']);
            $address = mysqli_real_escape_string($this->con, $params['address']);
            $phone_number = mysqli_real_escape_string($this->con, $params['phone_number']);
            $total_amount = intval($params['total_amount']);
            $status_order = mysqli_real_escape_string($this->con, $params['status_order']);

            $query = "UPDATE ORDERS SET
                    user_id = $user_id,
                    name = $name,
                    email = $email,
                    address = $address,
                    phone_number = $phone_number,
                    total_amount = $total_amount,
                    status_order = $status_order
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

        public function __destruct() {
            $this->con->close();
        }
    }
?>