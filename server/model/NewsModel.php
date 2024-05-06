<?php 
    require_once __DIR__ . '/../connect.php';

    class NewsModel {
        private $con;

        public function __construct() {
            $database = new Connect();
            $this->con = $database->connect();
        }

        // input: title, content, tag
        // output: bool
        public function create($params) {
            $title = mysqli_real_escape_string($this->con, $params['title']);
            $content = mysqli_real_escape_string($this->con, $params['content']);
            $publish_date = date('Y-m-d');
            $tag = mysqli_real_escape_string($this->con, $params['tag']);

            $query = "INSERT INTO NEWS
                    (title, content, publish_date, tag)
                    VALUES
                    ('$title', '$content', '$publish_date', '$tag')";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: id
        // output: a matched new
        public function read($params) {
            $id = intval($params['id']);

            $query = "SELECT * FROM NEWS WHERE id = $id";
            $result = mysqli_query($this->con, $query);

            $new = null;
            if ($result && mysqli_num_rows($result) > 0) {
                $new = mysqli_fetch_assoc($result);
            }

            return $new;
        }

        // input: id, title, content, tag
        // output: bool
        public function update($params) {
            $id = intval($params['id']);
            $title = mysqli_real_escape_string($this->con, $params['title']);
            $content = mysqli_real_escape_string($this->con, $params['content']);
            $tag = mysqli_real_escape_string($this->con, $params['tag']);

            $query = "UPDATE NEWS SET
                    title = '$title',
                    content = '$content',
                    tag = '$tag'
                    WHERE
                    id = '$id'";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: id
        // output: bool
        public function delete($params) {
            $id = intval($params['id']);

            $query = "DELETE FROM NEWS WHERE id = $id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        public function __destruct() {
            $this->con->close();
        }
    }
?>