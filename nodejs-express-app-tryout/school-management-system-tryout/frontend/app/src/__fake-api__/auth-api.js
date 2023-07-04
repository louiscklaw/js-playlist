// BOOKMARK: FAKE-API-AuthApi

// import { createResourceId } from '../utils/create-resource-id';
// import { sign, decode, JWT_SECRET, JWT_EXPIRES_IN } from '../utils/jwt';
// import { wait } from '../utils/wait';
// import axios from "axios";

// const API_ENDPOINT = '//localhost:3000/v1'

// const users = [
//   {
//     id: '5e86809283e28b96d2d38537',
//     avatar: '/static/mock-images/avatars/avatar-anika_visser.png',
//     email: 'demo@devias.io',
//     name: 'Anika Visser',
//     password: 'Password123!',
//     plan: 'Premium',
//   },
// ];

// TODO: REDIRECT TO api/auth-api

class AuthApi {
  async login({ email, password }) {
    alert('this is fake-api login');
  }

  async updateSelfBasicDetails(user) {
    alert('this is fake-api login');
  }

  async register({ email, name, password }) {
    alert('this is fake-api login');
  }

  me(accessToken) {
    alert('this is fake-api login');
  }
}

export const authApi = new AuthApi();
