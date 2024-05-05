<?php
    // Include the BookModel class
    require_once 'BookModel.php';

    // Create a new instance of BookModel
    $Model = new BookModel();

    // Test the create() method
    $createParams = [
        'book_name' => 'Sample Book',
        'author' => 'John Doe',
        'publisher' => 'Sample Publisher',
        'page_number' => 200,
        'publication_date' => '2023-05-01',
        'language' => 'English',
        'description' => 'A sample book description.',
        'price' => 29.99,
        'book_cover' => 'sample_cover.jpg',
        'img_url' => 'image.jpg',
    ];
    $createResult = $Model->create($createParams);
    echo "--> Create Result: " . ($createResult ? "Success" : "Failed") . "<br>\n";

    // Test the read() method
    $readResult = $Model->read(['book_id' => 1]);
    echo "--> Read Result: " . json_encode($readResult) . "<br>\n";

    // Test the update() method
    $updateParams = [
        'book_id' => 1,
        'book_name' => 'Updated Book',
        'author' => 'Mary Line',
        'publisher' => 'Sample Publisher',
        'page_number' => 250,
        'publication_date' => '2023-05-01',
        'language' => 'English',
        'description' => 'A sample book description.',
        'price' => 29.99,
        'book_cover' => 'sample_cover.jpg',
        'img_url' => 'image.jpg',
    ];
    $updateResult = $Model->update($updateParams);
    echo "--> Update Result: " . ($updateResult ? "Success" : "Failed") . "<br>\n";

    // Test the delete() method
    $deleteResult = $Model->delete(['book_id' => 1]);
    echo "--> Delete Result: " . ($deleteResult ? "Success" : "Failed") . "<br>\n";

    // Clean up (close database connection)
    unset($Model);
?>