<?php
    require_once __DIR__ . '/../model/ReviewModel.php';

    class ReviewController {
        private $reviewModel;

        public function __construct() {
            $this->reviewModel = new ReviewModel();
        }

        public function create($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'user_id' => $fromUser['id'],
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

        public function read($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'review_id' => $idRoute
            ];

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

        // For admin only
        public function readByUserId($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = $queryParams;
            
            $result = $this->reviewModel->readByUserId($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get user\'s review list successfully!',
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

        public function readMyReview($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'user_id' => $fromUser['id']
            ];
            
            $result = $this->reviewModel->readByUserId($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get user\'s review list successfully!',
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

        public function readByBookId($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'book_id' => $idRoute
            ];
            
            $result = $this->reviewModel->readByBookId($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get book\'s review list successfully!',
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

        public function update($idRoute = null, $queryParams, $postData, $fromUser) {
            $review = $this->reviewModel->read(['review_id' => $idRoute]);
            if (intval($fromUser['id']) != $review['user_id']) {
                http_response_code(401);
                return array(
                    'status' => 'Fail',
                    'message' => 'You don\'t have permission to change this review!',
                    'data' => []
                );
            }

            $params = [
                'review_id' => $idRoute
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
            
            $existed = $this->reviewModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Review not found!',
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

        public function delete($idRoute = null, $queryParams, $postData, $fromUser) {
            $review = $this->reviewModel->read(['review_id' => $idRoute]);
            if ($fromUser['role'] != 'admin') {
                if (intval($fromUser['id']) != $review['user_id']) {
                    http_response_code(401);
                    return array(
                        'status' => 'Fail',
                        'message' => 'You don\'t have permission to delete this review!',
                        'data' => []
                    );
                }
            }
            
            $params = [
                'review_id' => $idRoute
            ];
            
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