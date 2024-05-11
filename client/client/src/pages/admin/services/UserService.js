import { API_HEADERS, API_URL } from "../constants/api";

export class UserService {
    async adminRegister(username, email, fullName, date, password) {
        const body = {
            'user_name': username,
            'email': email,
            'fullname': fullName,
            'password': password,
            'bday': date
            
        };
        
        const response = await fetch(`${API_URL}/auth/registerAdmin`, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify(body)
        });
        return await response.json();
    }

    async adminLogin(username, password) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify({
                'user_name': username,
                'password': password,
            })
        });
        
        return await response.json();
    }

    async deleteUser(userId) {
        const response = await fetch(`${API_URL}/user/delete/${userId}`, {
            method: 'DELETE',
            headers: API_HEADERS,
        });
        return await response.json();
    }

    async findAll() {
        const response = await fetch(`${API_URL}/user/read`);
        return await response.json();
    }

    async updateUser(user_id, fullname, bday) {
        const response = await fetch(`${API_URL}/user/update`, {
            method: 'PATCH',
            headers: API_HEADERS,
            body: JSON.stringify({
                user_id,
                fullname, 
                bday
            })
        });
        return await response.json();
    }
}