<?php
    require_once __DIR__ . '/../model/BookModel.php';

    class BookController {
        private $bookModel;

        public function __construct() {
            $this->bookModel = new BookModel();
        }

        public function create($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = $postData;

            $result = $this->bookModel->create($params);
            if ($result) {
                http_response_code(201);
                return array(
                    'status' => 'Success',
                    'message' => 'Create book successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => "Create book failed!",
                    'data' => []
                );
            }
        }

        public function read($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'book_id' => $idRoute
            ];

            $result = $this->bookModel->read($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get book successfully!',
                    'data' => [$result]
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Book not found!',
                    'data' => []
                );
            }
        }

        public function readAll($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [];

            $result = $this->bookModel->readAll($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get book list successfully!',
                    'data' => $result
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'No book found!',
                    'data' => []
                );
            }
        }

        public function readBookByName($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = $queryParams;
            
            $result = $this->bookModel->readBookByName($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get books successfully!',
                    'data' => $result
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Get books failed!',
                    'data' => []
                );
            }
        }

        public function update($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'book_id' => $idRoute
            ];
            if (!empty($postData)) {
                $params = array_merge($params, $postData);
            }
            
            $existed = $this->bookModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Book not found!',
                    'data' => []
                );
            }

            $result = $this->bookModel->update($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Update book successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Update book failed!',
                    'data' => []
                );
            }
        }

        public function delete($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'book_id' => $idRoute
            ];
            
            $existed = $this->bookModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Book not found!',
                    'data' => []
                );
            }
            
            $result = $this->bookModel->delete($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Delete book successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Delete book failed!',
                    'data' => []
                );
            }
        }

        public function __destruct() {
            // Empty
        }
    }
?>