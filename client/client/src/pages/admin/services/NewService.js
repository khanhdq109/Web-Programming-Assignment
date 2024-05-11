import { API_HEADERS, API_URL } from "../constants/api";

export class NewService {
    async addNews(title, publishDate, tag, content) {
        const body = {
            'title': title,
            'publish_date': publishDate,
            'tag': tag,
            'content': content
        };
        
        const response = await fetch(`${API_URL}/news/create`, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify(body)
        });
        return await response.json();
    }

    async findAll() {
        const response = await fetch(`${API_URL}/news/read`, {
            method: 'GET',
            headers: API_HEADERS
        });
        return await response.json();
    }

    async deleteNews(id) {
        const response = await fetch(`${API_URL}/news/delete/${id}`, {
            method: 'DELETE',
            headers: API_HEADERS
        });
        return await response.json();
    }
}