<?php
    require_once __DIR__ . '/../model/CartModel.php';

    class CartController {
        private $cartModel;

        public function __construct() {
            $this->cartModel = new CartModel();
        }

        public function create($params) {
            $result = $this->cartModel->create($params);
            if ($result) {
                http_response_code(201);
                return array(
                    'status' => 'Success',
                    'message' => 'Add to cart successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => "Add to cart failed!",
                    'data' => []
                );
            }
        }

        public function read($params) {
            $result = $this->cartModel->read($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get item successfully!',
                    'data' => [$result]
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Item not found!',
                    'data' => []
                );
            }
        }

        public function readByUserId($params) {
            $result = $this->cartModel->readByUserId($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get cart successfully',
                    'data' => $result
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Cart not found!',
                    'data' => []
                );
            }
        }
 
        public function update($params) {
            $existed = $this->cartModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Item not found!',
                    'data' => []
                );
            }

            $result = $this->cartModel->update($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Update item successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Update item failed!',
                    'data' => []
                );
            }
        }

        public function delete($params) {
            $existed = $this->cartModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Item not found!',
                    'data' => []
                );
            }
            
            $result = $this->cartModel->delete($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Delete item successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Delete item failed!',
                    'data' => []
                );
            }
        }

        public function __destruct() {
            // Empty
        }
    }
?>