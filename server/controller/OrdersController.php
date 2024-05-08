<?php
    require_once __DIR__ . '/../model/OrdersModel.php';

    class OrdersController {
        private $ordersModel;

        public function __construct() {
            $this->ordersModel = new OrdersModel();
        }

        public function create($params) {
            $result = $this->ordersModel->create($params);
            if ($result) {
                http_response_code(201);
                return array(
                    'status' => 'Success',
                    'message' => 'Create order successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => "Create order failed!",
                    'data' => []
                );
            }
        }

        public function read($params) {
            $result = $this->ordersModel->read($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get order successfully!',
                    'data' => [$result]
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Order not found!',
                    'data' => []
                );
            }
        }

        public function update($params) {
            $existed = $this->ordersModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Order not found!',
                    'data' => []
                );
            }

            $result = $this->ordersModel->update($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Update order successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Update order failed!',
                    'data' => []
                );
            }
        }

        public function delete($params) {
            $existed = $this->ordersModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Order not found!',
                    'data' => []
                );
            }
            
            $result = $this->ordersModel->delete($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Delete order successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Delete order failed!',
                    'data' => []
                );
            }
        }

        public function __destruct() {
            // Empty
        }
    }
?>