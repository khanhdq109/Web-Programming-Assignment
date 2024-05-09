<?php 
    require_once __DIR__ . '/../connect.php';

    class ContactModel {
        private $con;

        public function __construct() {
            $database = new Connect();
            $this->con = $database->connect();
        }

        // input: fullname, email, title, content
        // output: bool
        public function create($params) {
            $defaultParams = [
                'fullname' => 'Full Name',
                'email' => 'sample@gmail.com',
                'title' => 'Title',
                'content' => 'Content'
            ];
            $params = array_merge($defaultParams, $params);
            
            $fullname = mysqli_real_escape_string($this->con, $params['fullname']);
            $email = mysqli_real_escape_string($this->con, $params['email']);
            $title = mysqli_real_escape_string($this->con, $params['title']);
            $content = mysqli_real_escape_string($this->con, $params['content']);

            $query = "INSERT INTO CONTACT
                    (fullname, email, title, content)
                    VALUES
                    ('$fullname', '$email', '$title', '$content')";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: id
        // output: a matched contact
        public function read($params) {
            $id = intval($params['id']);

            $query = "SELECT * FROM CONTACT WHERE id = $id";
            $result = mysqli_query($this->con, $query);

            $contact = null;
            if ($result && mysqli_num_rows($result) > 0) {
                $contact = mysqli_fetch_assoc($result);
            }

            return $contact;
        }

        // input: None
        // output: list of all contacts
        public function readAll($params) {
            $query = "SELECT * FROM CONTACT";
            $result = mysqli_query($this->con, $query);

            $contacts = [];
            if ($result && mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $contacts[] = $row;
                }
            }

            return $contacts;
        }

        // input: id --> Only update resolved status from admin
        // output: bool
        public function update($params) {
            $id = intval($params['id']);
            $resolved = true;

            $query = "UPDATE CONTACT SET resolved = $resolved WHERE id = $id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: id
        // output: bool
        public function delete($params) {
            $id = intval($params['id']);

            $query = "DELETE FROM CONTACT WHERE id = $id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        public function __destruct() {
            $this->con->close();
        }
    }
?>