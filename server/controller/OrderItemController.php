<?php
    require_once __DIR__ . '/../model/OrderItemModel.php';

    class OrderItemController {
        private $orderItemModel;

        public function __construct() {
            $this->orderItemModel = new OrderItemModel();
        }

        public function create($params) {
            $result = $this->orderItemModel->create($params);
            if ($result) {
                http_response_code(201);
                return array(
                    'status' => 'Success',
                    'message' => 'Create order item successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => "Create order item failed!",
                    'data' => []
                );
            }
        }

        public function read($params) {
            $result = $this->orderItemModel->read($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get order item successfully!',
                    'data' => [$result]
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Order item not found!',
                    'data' => []
                );
            }
        }

        public function readByOrderId($params) {
            $result = $this->orderItemModel->readByOrderId($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get order items successfully!',
                    'data' => $result
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'No order items available!',
                    'data' => []
                );
            }
        }

        public function update($params) {
            $existed = $this->orderItemModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Order item not found!',
                    'data' => []
                );
            }

            $result = $this->orderItemModel->update($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Update order item successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Update order item failed!',
                    'data' => []
                );
            }
        }

        public function delete($params) {
            $existed = $this->orderItemModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Order item not found!',
                    'data' => []
                );
            }
            
            $result = $this->orderItemModel->delete($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Delete order item successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Delete order item failed!',
                    'data' => []
                );
            }
        }

        public function __destruct() {
            // Empty
        }
    }
?>