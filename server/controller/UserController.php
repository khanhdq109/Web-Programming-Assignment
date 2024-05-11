<?php
    require_once __DIR__ . '/../model/UserModel.php';

    class UserController {
        private $secret_key = '9aB#4cD%6Ef&8gH@0jK^2mN$4pQ&6sT*8vW@0zZ';
        private $userModel;

        public function __construct() {
            $this->userModel = new UserModel();
        }

        public function register($idRoute = null, $queryParams, $postData, $fromUser) {
            // Pre-process and validate password
            $postData['password'] = password_hash($postData['password'], PASSWORD_DEFAULT);
            if (strlen($postData['password']) < 8) {
                http_response_code(411);
                return array(
                    'status' => 'error',
                    'message' => 'Password must have at least 8 characters long;'
                );
            }

            // Pre-process and validate email
            if (!filter_var($postData['email'], FILTER_VALIDATE_EMAIL)) {
                http_response_code(406);
                return array(
                    'status' => 'error',
                    'message' => 'Invalid email address!'
                );
            }

            $params = array_merge($postData, ['role' => 'user']);

            $result = $this->userModel->create($params);
            if ($result) {
                http_response_code(201);
                return array(
                    'status' => 'Success',
                    'message' => 'Register successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => "Register failed!",
                    'data' => []
                );
            }
        }

        public function registerAdmin($idRoute = null, $queryParams, $postData, $fromUser) {
            // Pre-process and validate password
            $postData['password'] = password_hash($postData['password'], PASSWORD_DEFAULT);
            if (strlen($postData['password']) < 8) {
                http_response_code(411);
                return array(
                    'status' => 'error',
                    'message' => 'Password must have at least 8 characters long;'
                );
            }

            // Pre-process and validate email
            if (!filter_var($postData['email'], FILTER_VALIDATE_EMAIL)) {
                http_response_code(406);
                return array(
                    'status' => 'error',
                    'message' => 'Invalid email address!'
                );
            }

            $params = array_merge($postData, ['role' => 'admin']);

            $result = $this->userModel->create($params);
            if ($result) {
                http_response_code(201);
                return array(
                    'status' => 'Success',
                    'message' => 'Register successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => "Register failed!",
                    'data' => []
                );
            }
        }

        public function login($idRoute = null, $queryParams, $postData, $fromUser) {
            $username = $postData['user_name'];

            if ($this->userModel->validateUser($postData)) {
                $user = $this->userModel->readByUserName(['user_name' => $username]);

                $header = base64_encode(json_encode(array(
                    'typ' => 'JWT',
                    'alg' => 'HS256'
                )));
                $payload = base64_encode(json_encode(array(
                    'id' => $user['user_id'],
                    'email' => $user['email'],
                    'user_name' => $user['user_name'],
                    'role' => $user['role'],
                    'fullname' => $user['fullname'],
                    'bday' => $user['bday'],
                    'point' => $user['bday'],
                    'avt_url' => $user['avt_url']
                )));
                $signature = hash_hmac('sha256', "$header.$payload", $this->secret_key, true);
                $signature = base64_encode($signature);

                $token = "$header.$payload.$signature";
                setcookie(
                    'jwt',
                    $token,
                    [
                        'expires' => time() + 60 * 60 * 24 * 30,
                        'path' => '/',
                        'domain' => 'localhost',
                        'secure' => false,
                        'httponly' => true,
                        'samesite' => 'Lax'
                    ]
                );

                http_response_code(200);
                return array(
                    'status' => 'success',
                    'message' => 'Log in successfully',
                    'data' => [$user]
                );
            }
            else {
                http_response_code(401);
                return array(
                    'status' => 'error',
                    'message' => 'The Username or Password is incorrect! Please try again.',
                    'data' => []
                );
            }
        }

        public function read($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'user_id' => $idRoute
            ];

            $result = $this->userModel->read($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get user successfully!',
                    'data' => [$result]
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'User not found!',
                    'data' => []
                );
            }
        }

        // For only admin
        public function readAll($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [];

            $result = $this->userModel->readAll($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get user list successfully!',
                    'data' => $result
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'No user found!',
                    'data' => []
                );
            }
        }

        public function readMyProfile($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'user_id' => $fromUser['id']
            ];

            $result = $this->userModel->read($params);
            if (!empty($result)) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Get user successfully!',
                    'data' => [$result]
                );
            }
            else {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'User not found!',
                    'data' => []
                );
            }
        }

        public function update($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'user_id' => $fromUser['id']
            ];
            $params = array_merge($params, $postData);
            
            $existed = $this->userModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'User not found!',
                    'data' => []
                );
            }

            $result = $this->userModel->update($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Update profile successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Update profile failed!',
                    'data' => []
                );
            }
        }

        // For only admin
        public function updatePoint($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'user_id' => $idRoute,
            ];
            $params = array_merge($params, $postData);

            $existed = $this->userModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'User not found!',
                    'data' => []
                );
            }

            $result = $this->userModel->updatePoint($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Update point successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Update point failed!',
                    'data' => []
                );
            }
        }

        public function updatePassword($idRoute = null, $queryParams, $postData, $fromUser) {
            http_response_code(501);
            return array(
                'status' => 'Fail',
                'message' => 'The feature is under development!',
                'data' => []
            );
        }

        public function forgetPassword($idRoute = null, $queryParams, $postData, $fromUser) {
            http_response_code(501);
            return array(
                'status' => 'Fail',
                'message' => 'The feature is under development!',
                'data' => []
            );
        }

        public function delete($idRoute = null, $queryParams, $postData, $fromUser) {
            $params = [
                'user_id' => $idRoute
            ];
            
            $existed = $this->userModel->read($params);
            if (empty($existed)) {
                http_response_code(404);
                return array(
                    'status' => 'Fail',
                    'message' => 'User not found!',
                    'data' => []
                );
            }
            
            $result = $this->userModel->delete($params);
            if ($result) {
                http_response_code(200);
                return array(
                    'status' => 'Success',
                    'message' => 'Delete user successfully!',
                    'data' => []
                );
            }
            else {
                http_response_code(400);
                return array(
                    'status' => 'Fail',
                    'message' => 'Delete user failed!',
                    'data' => []
                );
            }
        }

        public function logout($idRoute = null, $queryParams, $postData, $fromUser) {
            unset($_COOKIE['jwt']);
            setcookie('jwt', '', time() - 3600, '/', 'localhost', false, true);
            
            return array(
                'status' => 'success',
                'message' => 'Log out successfully!'
            );
        }

        public function __destruct() {
            // Empty
        }
    }
?>