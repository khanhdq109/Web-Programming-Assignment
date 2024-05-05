<?php 
    require_once __DIR__ . '/../connect.php/';

    class NewstModel {
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
                    ($title, $content, $publish_date, $tag)";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: news_id
        // output: a matched new
        public function read($params) {
            $news_id = intval($params['news_id']);

            $query = "SELECT * FROM NEWS WHERE news_id = $news_id";
            $result = mysqli_query($this->con, $query);

            $new = null;
            if ($result && mysqli_num_rows($result) > 0) {
                $new = mysqli_fetch_assoc($result);
            }

            return $new;
        }

        // input: news_id, title, content, tag
        // output: bool
        public function update($params) {
            $news_id = intval($params['news_id']);
            $title = mysqli_real_escape_string($this->con, $params['title']);
            $content = mysqli_real_escape_string($this->con, $params['content']);
            $tag = mysqli_real_escape_string($this->con, $params['tag']);

            $query = "UPDATE NEWS SET
                    title = $title,
                    content = $content,
                    tag = $tag
                    WHERE
                    news_id = $news_id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        // input: news_id
        // output: bool
        public function delete($params) {
            $news_id = intval($params['news_id']);

            $query = "DELETE FROM NEWS WHERE news_id = $news_id";
            $result = mysqli_query($this->con, $query);

            return $result ? true : false;
        }

        public function __destruct() {
            $this->con->close();
        }
    }
?>