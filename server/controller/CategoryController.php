<?php
    require_once __DIR__ . '/../model/CategoryModel.php';

    class CategoryController {
        private $categoryModel;

        public function __construct() {
            $this->categoryModel = new CategoryModel();
        }

        public function create($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'book_id' => $idRoute
            ];
            if(!empty($postData)) { 
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
            
            $result = $this->categoryModel->create($params);
            if ($result) {
                http_response_code(201);
                return array(
                    'status' => 'Success',
                    'message' => 'Add category successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => "Add category failed!",
                    'data' => []
                );
            }
        }

<<<<<<< HEAD
        public function readAllCategories($idRoute = null, $queryParams, $postData, $fromUser) {
            http_response_code(501);
            return array(
                'status' => 'Fail',
                'message' => 'The feature is under development!',
                'data' => []
            );
=======
        public function readAll($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = array();
            $result = $this->categoryModel->readAll();
            if(!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get categories successfully!',
                    'data' => $result
                ); 
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'This book has no category!',
                    'data' => []
                );
            }
>>>>>>> d6684562228c6caf5f07c6fe46cda9159229bd39
        }

        public function readByBookId($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'book_id' => $idRoute
            ];

            $result = $this->categoryModel->readByBookId($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get categories successfully!',
                    'data' => $result
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'This book has no category!',
                    'data' => []
                );
            }
        }

        public function readByCategory($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = $queryParams;
            
            $result = $this->categoryModel->readByCategory($params);
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
                    'message' => 'No book found!',
                    'data' => []
                );
            }
        }

        public function delete($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'book_id' => $idRoute
            ];
            $params = array_merge($params, $queryParams);
            
            $existed = $this->categoryModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Category not found!',
                    'data' => []
                );
            }
            
            $result = $this->categoryModel->delete($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Delete category successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Delete category failed!',
                    'data' => []
                );
            }
        }

        public function __destruct() {
            // Empty
        }
    }
?>