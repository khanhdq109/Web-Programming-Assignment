import { API_HEADERS, API_URL } from "../constants/api";

export class UserService {
    async adminRegister(username, email, fullName, password) {
        const body = {
            'user_name': username,
            'email': email,
            'fullname': fullName,
            'password':password,
            
        };

        console.log(body);
        const response = await fetch(`${API_URL}/auth/registerAdmin`, {
            method: 'POST',
            headers: API_HEADERS,
            body: body
        });
        return response.json();
    }
}