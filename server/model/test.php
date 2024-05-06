<?php
    // Include Model
    require_once 'UserModel.php';

    // Create a new instance of BookModel
    $Model = new UserModel();

    // Test the create() method
    $createParams = [
        'user_name' => 'khanhdq109133',
        'fullname' => 'Quoc Khanh Dao',
        'email' => 'khanh.daoquoc209@gmail.com',
        'password' => '01092002',
        'bday' => '2024-09-01',
        'avt_url' => 'img.jpg'
    ];
    $createResult = $Model->create($createParams);
    echo "--> Create Result: " . ($createResult ? "Success" : "Failed") . "<br>\n";

    // Test the read() method
    $readResult = $Model->read(['user_id' => 1]);
    echo "--> Read Result: " . json_encode($readResult) . "<br>\n";

    // Test the update() method
    $updateParams = [
        'user_id' => 5,
        'fullname' => 'Quoc Khanh Dao',
        'email' => 'khanh.daoquoc@hcmut.edu.vn',
        'password' => '01092002',
        'bday' => '2002-09-01',
        'avt_url' => 'img2.jpg'
    ];
    $updateResult = $Model->update($updateParams);
    echo "--> Update Result: " . ($updateResult ? "Success" : "Failed") . "<br>\n";

    // Test the delete() method
    $deleteResult = $Model->delete(['user_id' => 2]);
    echo "--> Delete Result: " . ($deleteResult ? "Success" : "Failed") . "<br>\n";

    // Clean up (close database connection)
    unset($Model);
?>