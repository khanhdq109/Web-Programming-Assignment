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
            $defaultParams = [
                'title' => 'Title',
                'content' => 'Content',
                'tag' => ''
            ];
            $params = array_merge($defaultParams, $params);

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
            $updateFields = [];
            foreach($params as $key => $value) {
                if ($key !== 'id') {
                    $escapedValue = mysqli_real_escape_string($this->con, $value);
                    if (is_numeric($value)) {
                        if ($key == 'price') {
                            $escapedValue = number_format(floatval($value), 2, '.', '');
                        }
                        else {
                            $escapedValue = intval($value);
                        }
                    }
                    $updateFields[] = "$key = '$escapedValue'";
                }
            }

            $query = "UPDATE NEWS SET " . implode(', ', $updateFields) . " WHERE id = $id";
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