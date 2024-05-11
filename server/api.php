<?php
    error_reporting(E_ERROR);

    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
    
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    
        exit(0);
    }

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
        'POST /api.php/book/create' => 'BookController@create@2',                               // Add book to database: book_name, author, publisher, page_number, publication_date, language, description, price, book_cover, img_url, on_sale
        'GET /api.php/book/read/(\d+)' => 'BookController@read@0',                              // Read book by id: book_id
        'GET /api.php/book/read' => 'BookController@readAll@0',                                 // Read list of all books: None
        'GET /api.php/book/search' => 'BookController@readBookByName@0',                        // Search book by name: book_name
        'PATCH /api.php/book/update/(\d+)' => 'BookController@update@0',                        // Update book information: book_id, book_name, author, publisher, page_number, publication_date, language, descriptioin, price, book_cover, img_url
        'DELETE /api.php/book/delete/(\d+)' => 'BookController@delete@2',                       // Delete book from database: book_id

        // Cart
        'POST /api.php/cart/create/(\d+)' => 'CartController@create@1',                         // Add book to cart: user_id, book_id, quantity
        'GET /api.php/cart/read' => 'CartController@readByUserId@1',                            // Read user's cart: user_id, book_id
        'PATCH /api.php/cart/update' => 'CartController@update@1',                              // Update user's cart: user_id, book_id, quantity
        'DELETE /api.php/cart/delete' => 'CartController@delete@1',                             // Delete book from user's cart: user_id, book_id

        // Category
        'POST /api.php/category/create/(\d+)' => 'CategoryController@create@2',                 // Add category to a specific book: book_id, category_name
        'GET /api.php/category/allCategories' => 'CategoryController@readAllCategories@0',      // Read list of all unique categories: None
        'GET /api.php/category/readCategories/(\d+)' => 'CategoryController@readByBookId@0',    // Read all categories of a specific book: book_id
        'GET /api.php/category/readBooks' => 'CategoryController@readByCategory@0',             // Read all the books of a specific category: category_name
        'GET /api.php/categories' => 'CategoryController@readAll@0',             // Read all the books of a specific category: category_name
        'DELETE /api.php/category/delete/(\d+)' => 'CategoryController@delete@2',               // Delete a category from a specific book: book_id, category_name

        // Contact
        'POST /api.php/contact/create' => 'ContactController@create@1',                         // Create a contact request to admin: fullname, email, title, content
        'GET /api.php/contact/read/(\d+)' => 'ContactController@read@2',                        // Read user's contact request: id
        'GET /api.php/contact/read' => 'ContactController@readAll@2',                           // Read all contact requests: None
        'PATCH /api.php/contact/update/(\d+)' => 'ContactController@update@2',                  // Update request's status (by true) by admin: id
        'DELETE /api.php/contact/delete/(\d+)' => 'ContactController@delete@2',                 // Delete a contact request by admin: id
        
        // Liked
        'POST /api.php/liked/create/(\d+)' => 'LikedController@create@1',                       // Like a specific book: user_id, book_id
        'GET /api.php/liked/read/(\d+)' => 'LikedController@read@1',                            // Read the liked status of a book, return empty array if user hasn't liked yet: user_id, book_id
        'GET /api.php/liked/readByUser' => 'LikedController@readByUserId@1',                    // Read user's liked books: user_id
        'GET /api.php/liked/readByBook/(\d+)' => 'LikedController@readByBookId@1',              // List of all users liked a specific book: book_id
        'DELETE /api.php/liked/delete/(\d+)' => 'LikedController@delete@1',                     // Unlike a specific book: user_id, book_id

        // News
        'POST /api.php/news/create' => 'NewsController@create@2',                               // Create a new: title, content, tag
        'GET /api.php/news/read/(\d+)' => 'NewsController@read@0',                              // Read a specific news: id
        'GET /api.php/news/read' => 'NewsController@readAll@0',                                 // Read list of all news: None
        'PATCH /api.php/news/update/(\d+)' => 'NewsController@update@2',                        // Update news: id, title, content, tag
        'DELETE /api.php/news/delete/(\d+)' => 'NewsController@delete@2',                       // Delete a specific news: id

        // Orders
        'POST /api.php/orders/create' => 'OrdersController@create@1',                           // Export user's order: user_id, name, email, address, phone_number, item (list of [bookk_id, quantity])
        'GET /api.php/orders/(\d+)' => 'OrdersController@read@1',                               // Read order's information: order_id
        'GET /api.php/orders' => 'OrdersController@readAll@2',                                  // Read all orders (for only admin): None
        'GET /api.php/orders/readUserOrders' => 'OrdersController@readByUserId@2',              // Read all orders of a specific user (for only admin): user_id
        'GET /api.php/orders/readMyOrders' => 'OrdersController@readMyOrder@1',                 // Read user's orders (for user): user_id
        'PATCH /api.php/orders/(\d+)' => 'OrdersController@update@2',                           // Update status order by admin: order_id, status_order
        'DELETE /api.php/orders/(\d+)' => 'OrdersController@delete@2',                          // Delete a specific order: order_id

        // Review
        'POST /api.php/review/create/(\d+)' => 'ReviewController@create@1',                     // Create a review: user_id, book_id, rating, review
        'GET /api.php/review/read/(\d+)' =>  'ReviewController@read@0',                         // Read a specific review: review_id
        'GET /api.php/review/readByUser' => 'ReviewController@readByUserId@2',                  // Read reviews of a specific user (for only admin): user_id
        'GET /api.php/review/readMyReviews' => 'ReviewController@readMyReview@1',               // Read reviews of user (for user): user_id
        'GET /api.php/review/readByBook/(\d+)' => 'ReviewController@readByBookId@0',            // Read all reviews of a specific book: book_id 
        'PATCH /api.php/review/update/(\d+)' => 'ReviewController@update@1',                    // Update user's review: review_id, rating, review
        'DELETE /api.php/review/update/(\d+)' => 'ReviewController@delete@1',                   // Delete a review: review_id

        // User
        'POST /api.php/auth/register' => 'UserController@register@0',                           // Register for normal user: user_name, fullname, email, password, bday, avt_url
        'POST /api.php/auth/registerAdmin' => 'UserController@registerAdmin@0',                 // Register for admin: user_name, fullname, email, password, bday, avt_url
        'POST /api.php/auth/login' => 'UserController@login@0',                                 // Login: user_name, password
        'GET /api.php/auth/logout' => 'UserController@logout@1',                                // Logout: None
        'POST /api.php/auth/updatePassword' => 'UserController@updatePassword@1',               // Update password: user_id, old_password, new_password
        'POST /api.php/auth/forgotPassword' => 'UserController@forgotPassword@0',               // Forgot password: user_name/email, OTP
        'POST /api.php/auth/updateEmail' => 'UserController@updateEmail@1',                     // Update email address: OTP, new_email
        'GET /api.php/user/read/(\d+)' => 'UserController@read@0',                              // Read a specific user profile: user_id
        'GET /api.php/user/read' => 'UserController@readAll@2',                                 // Read all user's profiles (for only admin): None
        'GET /api.php/user/myProfile' => 'UserController@readMyProfile@1',                      // Read user's profile: user_id
        'PATCH /api.php/user/update' => 'UserController@update@1',                              // Update user's profile: user_id, fullname, bday, avt_url
        'PATCH /api.php/user/updatePoint/(\d+)' => 'UserController@updatePoint@2',              // Update user's promotion point (for only admin / or automatically): user_id, point
        'DELETE /api.php/user/delete/(\d+)' => 'UserController@delete@2',                       // Delete user
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

            require __DIR__ . '/controller/' . $controllerName . '.php';
            $controller = new $controllerName();

            $response = call_user_func_array([$controller, $methodName], [$params, $_GET, $data, $payload]);
            echo json_encode($response);

            // Comment to test api
            // if ($routeUserLevel <= $userLevel) {
            //     __DIR__ . '/controller/' . $controllerName . '.php';
            //     $controller = new $controllerName();
    
            //     $response = call_user_func_array([$controller, $methodName], [$params, $_GET, $data, $payload]);
            //     echo json_encode($response);
            // }
            // else {
            //     http_response_code(401);
            //     echo json_encode([
            //         'status' => 'Unauthorized',
            //         'message' => 'You do not have permission to access this resource!',
            //         'data' => []
            //     ]);
            // }

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