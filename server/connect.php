<?php 
    class Connect {
        private $host = 'localhost';
        private $user = 'root';
        private $password = '';
        private $database = 'bookstore';

        public function connect() {
            $con = mysqli_connect($this->host, $this->user, $this->password, $this->database);
            
            if (!$con) {
                die('Connection faild: ' . mysqli_connect_error());
            }

            return $con;
        }
    }
?>