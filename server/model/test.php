<?php
    // Include Model
    require_once 'CartModel.php';

    // Create a new instance of BookModel
    $Model = new CartModel();

    // Test the create() method
    $createParams = [
        'user_id' => 2,
        'book_id' => 5,
        'quantity' => 4
    ];
    $createResult = $Model->create($createParams);
    echo "--> Create Result: " . ($createResult ? "Success" : "Failed") . "<br>\n";

    // Test the read() method
    $readResult = $Model->read(['user_id' => 2, 'book_id' => 5]);
    echo "--> Read Result: " . json_encode($readResult) . "<br>\n";

    // Test the update() method
    $updateParams = [
        'user_id' => 2,
        'book_id' => 5,
        'quantity' => 6
    ];
    $updateResult = $Model->update($updateParams);
    echo "--> Update Result: " . ($updateResult ? "Success" : "Failed") . "<br>\n";

    // Test the delete() method
    $deleteResult = $Model->delete(['user_id' => 2, 'book_id' => 5]);
    echo "--> Delete Result: " . ($deleteResult ? "Success" : "Failed") . "<br>\n";

    // Clean up (close database connection)
    unset($Model);
?>