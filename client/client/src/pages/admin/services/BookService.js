import { API_HEADERS, API_URL } from "../constants/api";

class BookService {

    async addBook(bookName, price, imgUrl, bookCover, pageNum, publisher, publicationDate, description, onSale) {
        const body = {
            'book_name': bookName,
            'price': price,
            'img_url': imgUrl,
            'book_cover': bookCover,
            'page_num': pageNum,
            'publisher': publisher,
            'publication_date': publicationDate,
            'description': description,
            'on_sale': onSale
        };
        
        const response = await fetch(`${API_URL}/book/create`, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify(body)
        });
        return await response.json();
    }

    async findAll() {
        // use api /api.php/book/read
        const response = await fetch(`${API_URL}/book/read`);
        return await response.json();
    }

    async deleteBook(bookId) {
        const response = await fetch(`${API_URL}/book/delete/${bookId}`, {
            method: 'DELETE',
            headers: API_HEADERS
        });
        return await response.json();
    }
}

export default BookService;