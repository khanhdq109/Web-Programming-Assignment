<?php
    error_reporting(E_ERROR);

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: http://localhost:80');
    header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Credentials: true');

    $request = $_SERVER['REQUEST_URI'];
    $method = $_SERVER['REQUEST_METHOD'];

    // Retrieve and decode data from POST method
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);


    $userLevel = 0; // 0: guest, 1: user, 2: admin
    $payLoad = [];
    if (isset($_COOKIE['jwt'])) {
        $jwt = $_COOKIE['jwt'];
        $parts = explode('.', $jwt);

        // Decode header and payload
        $header = json_decode(base64_decode($parts[0]), true);
        $payload = json_decode(base64_decode($parts[1]), true);

        // Compute the signature
        $secret_key = '9aB#4cD%6Ef&8gH@0jK^2mN$4pQ&6sT*8vW@0zZ';
        $signature = hash_hmac('sha256', "$parts[0].$parts[1]", $secret_key, true);
        $signature = base64_encode($signature);

        $validToken = $signature === $parts[2];
        if ($validToken) {
            if ($payload['role'] == 'user') {
                $userLevel = 1;
            }
            else if ($payload['role'] == 'admin') {
                $userLevel = 2;
            }
        }
    }

    $routes = [
        // Book
        'POST /api.php/book' => 'BookController@create@2',
        'GET /api.php/book/(\d+)' => 'BookController@read@0',
        'GET /api.php/book' => 'BookController@readAll@0',
        'PATCH /api.php/book/(\d+)' => 'BookController@update@2',
        'DELETE /api.php/book/(\d+)' => 'BookController@delete@2',
    ];

    $routeKey = $method . ' ' . $request;

    foreach ($routes as $routePattern => $action) {
        list($routeMethod, $routePath) = explode(' ', $routePattern, 2);

        if ($routeMethod == $method && preg_match("#^{$routePath}(\?.*)?$#", $request, $matches)) {
            $actionInfo = explode('@', $action);
            $controllerName = $actionInfo[0];
            $methodName = $actionInfo[1];
            $routeUserLevel = intval($actionInfo[2]);

            $params = array_slice($matches, 1)[0];

            if ($routeUserLevel <= $userLevel) {
                require __DIR__ . '/controller/' . $controllerName . '.php';
                $controller = new $controllerName();

                $response = call_user_func_array([$controller, $methodName], [$params, $_GET, $data, $payload]);
                echo json_encode($response);
            }
            else {
                http_response_code(401);
                echo json_encode([
                    'status' => 'Unauthorized',
                    'message' => 'You are not authorized to access this resource!',
                    'data' => []
                ]);
            }

            exit;
        }
    }

    http_response_code(404);
    echo json_encode([
        'status' => 'Not found',
        'message' => 'The requested resource was not found!',
        'data' => []
    ]);
?>