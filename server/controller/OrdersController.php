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
            if (!empty($postData)) {
                $params = array_merge($params, $postData);
            }
            else {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Nothing up-to-date!',
                    'data' => []
                );
            }
            
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
            $items = isset($postData['item']) ? $postData['item'] : array(); // array of [book_id, quantity]
            foreach ($items as $item_params) {
                $item_params = array_merge($item_params, ['order_id' => $order_id]);
                $result = $this->orderItemModel->create($item_params);
                if (!$result) {
                    http_response_code(400);
                    return array(
                        'status' => 'Fail',
                        'message' => "Create order item failed!",
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

        public function read($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'order_id' => $idRoute
            ];
            
            $result = $this->ordersModel->read($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get order information successfully!',
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

        public function readAll($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = array();
            
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

        // For admin
        public function readByUserId($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = $queryParams;

            $result = $this->ordersModel->readByUserId($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get user\'s orders successfully!',
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

        // For user
        public function readMyOrder($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'user_id' => $fromUser['id']
            ];

            $result = $this->ordersModel->readByUserId($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get user\'s orders successfully!',
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

        public function update($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = array();
            if (!empty($postData)) {
                $params = $postData;
            }
            else {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Nothing up-to-date!',
                    'data' => []
                );
            }
            
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
                    'message' => 'Update order status successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Update order status failed!',
                    'data' => []
                );
            }
        }

        // For only admin
        public function delete($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = $queryParams;

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