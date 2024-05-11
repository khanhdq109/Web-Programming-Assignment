<?php
    require_once __DIR__ . '/../model/NewsModel.php';

    class NewsController {
        private $newsModel;

        public function __construct() {
            $this->newsModel = new NewsModel();
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

            $result = $this->newsModel->create($params);
            if ($result) {
                http_response_code(201);
                return array(
                    'status' => 'Success',
                    'message' => 'Create news successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => "Create news failed!",
                    'data' => []
                );
            }
        }

        public function read($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'id' => $idRoute
            ];

            $result = $this->newsModel->read($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get news\'s content successfully!',
                    'data' => [$result]
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'News not found!',
                    'data' => []
                );
            }
        }

        public function readAll($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = array();
            
            $result = $this->newsModel->readAll($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get news list successfully!',
                    'data' => $result
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'No news found!',
                    'data' => []
                );
            }
        }

        public function update($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'id' => $idRoute
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

            $existed = $this->newsModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'News not found!',
                    'data' => []
                );
            }

            $result = $this->newsModel->update($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Update news content successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Update news content failed!',
                    'data' => []
                );
            }
        }

        public function delete($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'id' => $idRoute
            ];
            
            $existed = $this->newsModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'News not found!',
                    'data' => []
                );
            }
            
            $result = $this->newsModel->delete($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Delete news successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Delete news failed!',
                    'data' => []
                );
            }
        }

        public function __destruct() {
            // Empty
        }
    }
?>