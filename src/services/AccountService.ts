import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://localhost:8081/api/accounts/';

export interface ParentAccount {
  id: number;
  accountNumber: string;
  accountName: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
  createdAtIST: string;
  updatedAtIST: string;
  systemCreated: string;
  systemUpdated: string;
}

export interface ChildAccount {
  id: number;
  accountNumber: string;
  accountName: string;
  balance: number;
  parentAccountId: number;
  createdAt: string;
  updatedAt: string;
  createdAtIST: string;
  updatedAtIST: string;
  systemCreated: string;
  systemUpdated: string;
}

export interface ParentDashboardData {
  parentAccount: ParentAccount;
  childAccounts: ChildAccount[];
}

// Add authorization header with JWT token
const authHeader = () => {
  const token = AuthService.getToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};

class AccountService {
  getParentAccount() {
    return axios.get<ParentDashboardData>(API_URL + 'parent', {
      headers: authHeader(),
    });
  }

  getChildAccount() {
    return axios.get<ChildAccount>(API_URL + 'child', {
      headers: authHeader(),
    });
  }

  getParentAccountById(id: number) {
    return axios.get<ParentAccount>(`${API_URL}parent/${id}`, {
      headers: authHeader(),
    });
  }

  getChildAccountById(id: number) {
    return axios.get<ChildAccount>(`${API_URL}child/${id}`, {
      headers: authHeader(),
    });
  }
}

export default new AccountService();
