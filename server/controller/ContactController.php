<?php
    require_once __DIR__ . '/../model/ContactModel.php';

    class ContactController {
        private $contactModel;

        public function __construct() {
            $this->contactModel = new ContactModel();
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

            $result = $this->contactModel->create($params);
            if ($result) {
                http_response_code(201);
                return array(
                    'status' => 'Success',
                    'message' => 'Create contact request successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => "Create contact request failed!",
                    'data' => []
                );
            }
        }

        public function read($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'id' => $idRoute
            ];
            
            $result = $this->contactModel->read($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get contact request information successfully!',
                    'data' => [$result]
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Contact request not found!',
                    'data' => []
                );
            }
        }

        public function readAll($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = array();

            $result = $this->contactModel->readAll($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get contact request list successfully!',
                    'data' => $result
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'No contact request found!',
                    'data' => []
                );
            }
        }

        public function update($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'id' => $idRoute
            ];
            
            $existed = $this->contactModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Contact request not found!',
                    'data' => []
                );
            }

            $result = $this->contactModel->update($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Update contact request status successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Update contact request status failed!',
                    'data' => []
                );
            }
        }

        public function delete($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'id' => $idRoute
            ];
            
            $existed = $this->contactModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Contact request not found!',
                    'data' => []
                );
            }
            
            $result = $this->contactModel->delete($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Delete contact request successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Delete contact request failed!',
                    'data' => []
                );
            }
        }

        public function __destruct() {
            // Empty
        }
    }
?>