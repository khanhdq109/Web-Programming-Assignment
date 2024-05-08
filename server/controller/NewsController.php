<?php
    require_once __DIR__ . '/../model/NewsModel.php';

    class BookController {
        private $newsModel;

        public function __construct() {
            $this->newsModel = new NewsModel();
        }

        public function create($params) {
            $result = $this->newsModel->create($params);
            if ($result) {
                http_response_code(201);
                return array(
                    'status' => 'Success',
                    'message' => 'Create new successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => "Create new failed!",
                    'data' => []
                );
            }
        }

        public function read($params) {
            $result = $this->newsModel->read($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get new successfully!',
                    'data' => [$result]
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'New not found!',
                    'data' => []
                );
            }
        }

        public function update($params) {
            $existed = $this->newsModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'New not found!',
                    'data' => []
                );
            }

            $result = $this->newsModel->update($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Update new successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Update new failed!',
                    'data' => []
                );
            }
        }

        public function delete($params) {
            $existed = $this->newsModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'New not found!',
                    'data' => []
                );
            }
            
            $result = $this->newsModel->delete($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Delete new successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Delete new failed!',
                    'data' => []
                );
            }
        }

        public function __destruct() {
            // Empty
        }
    }
?>