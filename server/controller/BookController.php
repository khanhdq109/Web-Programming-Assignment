<?php
    require_once __DIR__ . '/../model/BookModel.php';

    class BookController {
        private $bookModel;

        public function __construct() {
            $this->bookModel = new BookModel();
        }

        public function create($idRoute = null, $queryParams, $postData, $fromUser) {
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

            $result = $this->bookModel->create($params);
            if ($result) {
                http_response_code(201);
                return array(
                    'status' => 'Success',
                    'message' => 'Add book to the database successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => "Add book to the database failed!",
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
                    'message' => 'Get book information successfully!',
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
            $params = array();

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
                    'message' => 'Search books successfully!',
                    'data' => $result
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'No book matched!',
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
            else {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Nothing up-to-date!',
                    'data' => []
                );
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
                    'message' => 'Update book information successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Update book information failed!',
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
                    'message' => 'Delete book from database successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Delete book from database failed!',
                    'data' => []
                );
            }
        }

        public function __destruct() {
            // Empty
        }
    }
?>