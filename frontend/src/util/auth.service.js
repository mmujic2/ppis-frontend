import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login(email, password) {
    return api
      .post("/auth/login", {
        email,
        password
      })
      .then(response => {
        if (response.status===200) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }



  getCurrentUser() {
    return TokenService.getUser();
  }
}

export default new AuthService();