import { API_URL } from "../constants/api";

export class CategoryService {
    async findAll() {
        const response = await fetch(`${API_URL}/categories`);
        return await response.json();
    }
}