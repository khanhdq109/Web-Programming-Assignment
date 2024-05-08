<?php
    require_once __DIR__ . '/../model/CategoryModel.php';

    class CategoryController {
        private $categoryModel;

        public function __construct() {
            $this->categoryModel = new CategoryModel();
        }

        public function create($params) {
            $result = $this->categoryModel->create($params);
            if ($result) {
                http_response_code(201);
                return array(
                    'status' => 'Success',
                    'message' => 'Add to category successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => "Add to category failed!",
                    'data' => []
                );
            }
        }

        public function read($params) {
            $result = $this->categoryModel->read($params);
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

        public function readByBookId($params) {
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
                    'message' => 'Get categories failed!',
                    'data' => []
                );
            }
        }

        public function readByCategory($params) {
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
                    'message' => 'Get books failed!',
                    'data' => []
                );
            }
        }
 
        public function update($params) {
            $existed = $this->categoryModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Category not found!',
                    'data' => []
                );
            }

            $result = $this->categoryModel->update($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Update category successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Update category failed!',
                    'data' => []
                );
            }
        }

        public function delete($params) {
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