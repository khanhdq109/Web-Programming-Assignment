<?php 
    require_once __DIR__ . '/../connect.php';

    class UserModel {
        private $con;

        public function __construct() {
            $database = new Connect();
            $this->con = $database->connect();
        }

        // input: user_name, fullname, email, password, bday, role, avt_url
        // output: bool
        public function create($params) {
            $user_name = mysqli_real_escape_string($this->con, $params['user_name']);
            $fullname = mysqli_real_escape_string($this->con, $params['fullname']);
            $email = mysqli_real_escape_string($this->con, $params['email']);
            $password = mysqli_real_escape_string($this->con, $params['password']);
            $bday = mysqli_real_escape_string($this->con, $params['bday']);
            if (isset($params['role'])) {
                $role = mysqli_real_escape_string($this->con, $params['role']);
            }
            else {
                $role = mysqli_real_escape_string($this->con, 'user');
            }
            $avt_url = mysqli_real_escape_string($this->con, $params['avt_url']);

            $query = "INSERT INTO USER
                    (user_name, fullname, email, password, bday, role, avt_url)
                    VALUES
                    ('$user_name', '$fullname', '$email', '$password', '$bday', '$role', '$avt_url')";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: user_id
        // output: a matched user
        public function read($params) {
            $user_id = intval($params['user_id']);

            $query = "SELECT * FROM USER WHERE user_id = $user_id";
            $result = mysqli_query($this->con, $query);

            $user = null;
            if ($result && mysqli_num_rows($result) > 0) {
                $user = mysqli_fetch_assoc($result);
            }

            return $user;
        }

        // input: user_id, fullname, email, password, bday, point, avt_url
        // output: bool
        public function update($params) {
            $user_id = intval($params['user_id']);
            $fullname = mysqli_real_escape_string($this->con, $params['fullname']);
            $email = mysqli_real_escape_string($this->con, $params['email']);
            $password = mysqli_real_escape_string($this->con, $params['password']);
            $bday = mysqli_real_escape_string($this->con, $params['bday']);
            $avt_url = mysqli_real_escape_string($this->con, $params['avt_url']);

            $query = "UPDATE USER SET
                    fullname = '$fullname',
                    email = '$email',
                    password = '$password',
                    bday = '$bday',
                    avt_url = '$avt_url'
                    WHERE
                    user_id = $user_id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: user_id, point added
        // output: bool
        public function updatePoint($params) {
            $user_id = intval($params['user_id']);
            $added = intval($params['point']);
            
            $user = $this->read(['user_id' => $user_id]);
            if (!empty($user)) {
                $point = $user['point'] + $added;
            }
            else {
                return false;
            }

            $query = "UPDATE USER SET
                    point = $point
                    WHERE
                    user_id = $user_id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: user_id
        // output: bool
        public function delete($params) {
            $user_id = intval($params['user_id']); 

            $query = "DELETE FROM USER WHERE user_id = $user_id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        public function __destruct() {
            $this->con->close();
        }
    }
?>