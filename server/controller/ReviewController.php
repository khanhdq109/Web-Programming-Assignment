<?php
    require_once __DIR__ . '/../model/ReviewModel.php';

    class ReviewController {
        private $reviewModel;

        public function __construct() {
            $this->reviewModel = new ReviewModel();
        }

        public function create($params) {
            $result = $this->reviewModel->create($params);
            if ($result) {
                http_response_code(201);
                return array(
                    'status' => 'Success',
                    'message' => 'Create review successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => "Create review failed!",
                    'data' => []
                );
            }
        }

        public function read($params) {
            $result = $this->reviewModel->read($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get review successfully!',
                    'data' => [$result]
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Review not found!',
                    'data' => []
                );
            }
        }

        public function readByUserId($params) {
            $result = $this->reviewModel->readByUserId($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get review list successfully!',
                    'data' => $result
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'No review found!',
                    'data' => []
                );
            }
        }

        public function readByBookId($params) {
            $result = $this->reviewModel->readByBookId($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get review list successfully!',
                    'data' => $result
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Get review list failed!',
                    'data' => []
                );
            }
        }

        public function update($params) {
            $existed = $this->reviewModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Book not found!',
                    'data' => []
                );
            }

            $result = $this->reviewModel->update($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Update review successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Update review failed!',
                    'data' => []
                );
            }
        }

        public function delete($params) {
            $existed = $this->reviewModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Review not found!',
                    'data' => []
                );
            }
            
            $result = $this->reviewModel->delete($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Delete review successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Delete review failed!',
                    'data' => []
                );
            }
        }

        public function __destruct() {
            // Empty
        }
    }
?>