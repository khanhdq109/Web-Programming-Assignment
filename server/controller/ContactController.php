<?php
    require_once __DIR__ . '/../model/ContactModel.php';

    class ContactController {
        private $contactModel;

        public function __construct() {
            $this->contactModel = new ContactModel();
        }

        public function create($params) {
            $result = $this->contactModel->create($params);
            if ($result) {
                http_response_code(201);
                return array(
                    'status' => 'Success',
                    'message' => 'Create contact successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => "Create contact failed!",
                    'data' => []
                );
            }
        }

        public function read($params) {
            $result = $this->contactModel->read($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get contact successfully!',
                    'data' => [$result]
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Contact not found!',
                    'data' => []
                );
            }
        }

        public function update($params) {
            $existed = $this->contactModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Contact not found!',
                    'data' => []
                );
            }

            $result = $this->contactModel->update($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Update contact status successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Update contact status failed!',
                    'data' => []
                );
            }
        }

        public function delete($params) {
            $existed = $this->contactModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'Contact not found!',
                    'data' => []
                );
            }
            
            $result = $this->contactModel->delete($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Delete contact successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Delete contact failed!',
                    'data' => []
                );
            }
        }

        public function __destruct() {
            // Empty
        }
    }
?>