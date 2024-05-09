<?php
    require_once __DIR__ . '/../model/OrderItemModel.php';
    require_once __DIR__ . '/../model/OrdersModel.php';

    class OrdersController {
        private $orderItemModel;
        private $ordersModel;

        public function __construct() {
            $this->orderItemModel = new OrderItemModel();
            $this->ordersModel = new OrdersModel();
        }

        public function create($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'user_id' => $fromUser['id']
            ];
            $params = array_merge($params, $postData);
            
            $result = $this->ordersModel->create($params);
            if (!$result) {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => "Create order failed!",
                    'data' => []
                );
            }

            $order_id = $this->ordersModel->lastInsertId();
            $items = isset($postData['item']) ? $postData['item'] : array();
            foreach ($items as $item_params) {
                $result = $this->orderItemModel->create($item_params);
                if (!$result) {
                    http_response_code(400);
                    return array(
                        'status' => 'Fail',
                        'message' => "Create item failed!",
                        'data' => []
                    );
                }
            }
            
            $updateParams = [
                'order_id' => $order_id
            ];
            $result = $this->ordersModel->updateTotalAmount($updateParams);

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

        public function readAll($params) {
            $result = $this->ordersModel->readAll($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get order list successfully!',
                    'data' => $result
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'No order found!',
                    'data' => []
                );
            }
        }

        public function readByUserId($params) {
            $result = $this->ordersModel->readByUserId($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get order list successfully!',
                    'data' => $result
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'No order found!',
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