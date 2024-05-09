<?php
    require_once __DIR__ . '/../model/LikedModel.php';

    class LikedController {
        private $likedModel;

        public function __construct() {
            $this->likedModel = new LikedModel();
        }

        public function create($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'user_id' => $fromUser['id'],
                'book_id' => $idRoute
            ];
            
            $result = $this->likedModel->create($params);
            if ($result) {
                http_response_code(201);
                return array(
                    'status' => 'Success',
                    'message' => 'Like successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => "Like failed!",
                    'data' => []
                );
            }
        }

        public function read($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'user_id' => $fromUser['id'],
                'book_id' => $idRoute
            ];
            
            $result = $this->likedModel->read($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Read successfully!',
                    'data' => [$result]
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Read failed!',
                    'data' => []
                );
            }
        }

        public function readByUserId($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'user_id' => $fromUser['id']
            ];

            $result = $this->likedModel->readByUserId($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get favorite books successfully!',
                    'data' => $result
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'No favorite book found!',
                    'data' => []
                );
            }
        }

        public function readByBookId($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'book_id' => $idRoute
            ];
            
            $result = $this->likedModel->readByBookId($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get liked people successfully!',
                    'data' => $result
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'No liked people found!',
                    'data' => []
                );
            }
        }

        public function delete($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'user_id' => $fromUser['id'],
                'book_id' => $idRoute
            ];
            
            $existed = $this->likedModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Like not found!',
                    'data' => []
                );
            }
            
            $result = $this->likedModel->delete($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Unlike successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Unlike failed!',
                    'data' => []
                );
            }
        }

        public function __destruct() {
            // Empty
        }
    }
?>