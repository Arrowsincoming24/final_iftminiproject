import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:8081/api/auth/';

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  parentAccountId?: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface JwtResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  fullName: string;
  roles: string[];
}

export interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
}

class AuthService {
  login(username: string, password: string) {
    return axios
      .post<JwtResponse>(API_URL + 'signin', { username, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  registerParent(signupRequest: SignupRequest) {
    return axios.post(API_URL + 'signup/parent', signupRequest);
  }

  registerChild(signupRequest: SignupRequest) {
    return axios.post(API_URL + 'signup/child', signupRequest);
  }

  getCurrentUser(): JwtResponse | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  isLoggedIn(): boolean {
    const user = this.getCurrentUser();
    if (user && user.token) {
      const decoded = jwtDecode<JwtPayload>(user.token);
      // Check if token is expired
      return decoded.exp * 1000 > Date.now();
    }
    return false;
  }

  isParent(): boolean {
    const user = this.getCurrentUser();
    return !!user && user.roles.includes('ROLE_PARENT');
  }

  isChild(): boolean {
    const user = this.getCurrentUser();
    return !!user && user.roles.includes('ROLE_CHILD');
  }

  getToken(): string | null {
    const user = this.getCurrentUser();
    return user ? user.token : null;
  }
}

export default new AuthService();
