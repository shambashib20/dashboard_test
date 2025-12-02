import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

class AuthService {
  static instance;
  api;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async register({ name, email, phone_number, password }) {
    try {
      const response = await this.api.post("/auth/register", {
        name,
        email,
        phone_number,
        password,
      });
      return response.data;
    } catch (error) {
      if (error?.response?.data) {
        throw new Error(error.response.data.message || "Registration failed");
      }
      throw new Error("Network error, please try again");
    }
  }

  async login({ email, password, phone_number }) {
    try {
      const response = await this.api.post("/auth/login", {
        email,
        password,
        phone_number,
      });
      return response.data;
    } catch (error) {
      if (error?.response?.data) {
        throw new Error(error.response.data.message || "Login failed");
      }
      throw new Error("Network error, please try again");
    }
  }

  async forgotPassword({ email }) {
    try {
      const response = await this.api.post("/auth/forget-password", {
        emailOrPhone: email,
      });
      return response.data;
    } catch (error) {
      if (error?.response?.data) {
        throw new Error(error.response.data.message || "Password reset failed");
      }
      throw new Error("Network error, please try again");
    }
  }

  async resetPassword({ otp, newPassword }) {
    const response = await this.api.post("/auth/reset-password", {
      otp,
      newPassword,
    });
    return response.data;
  }
}

export const authService = AuthService.getInstance();
