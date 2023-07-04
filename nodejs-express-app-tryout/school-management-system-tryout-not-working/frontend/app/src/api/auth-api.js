import { createResourceId } from '../utils/create-resource-id';
import { sign, decode, JWT_SECRET, JWT_EXPIRES_IN } from '../utils/jwt';
import { wait } from '../utils/wait';
import axios from "axios";

const API_ENDPOINT = '//localhost:3000/v1'

const users = [
  {
    id: '5e86809283e28b96d2d38537',
    avatar: '/static/mock-images/avatars/avatar-anika_visser.png',
    email: 'demo@devias.io',
    name: 'Anika Visser',
    password: 'Password123!',
    plan: 'Premium',
  },
];

// BOOKMARK: AuthApi
class AuthApi {
  async login({ email, password }) {
    if (process.env.NODE_ENV == 'development') {
      await wait(1000)
    }


    return new Promise((resolve, reject) => {
      axios.post('//localhost:3000/v1/auth/login', {
        "email": email,
        "password": password
      }).then(function ({ data }) {
        console.log(data);
        const { access, refresh } = data.tokens;
        const { token } = access;

        // return token;
        resolve(token);
      }).catch(function (error) {
        console.error('[Auth Api]: ', error);
        reject(new Error('Internal server error'));
      });
    });
  }

  async updateSelfBasicDetails(user) {
    const accessToken = globalThis.localStorage.getItem('accessToken');
    const headers = { Authorization: `Bearer ${accessToken}` };

    return axios.put(`${API_ENDPOINT}/auth/basic-user-detail`,
      {
        email: user.email,
        name: user.name
      },
      { headers })
      .then(function ({ data }) {
        console.log(data);
      })
      .catch(function (error) {
        console.error('[Auth Api]: ', error);
        reject(new Error('Internal server error'));
      });

    // return new Promise((resolve, reject) => {
    //   try {
    //     // Find the user
    //     const user = users.find(_user => _user.email === email);

    //     if (!user || user.password !== password) {
    //       reject(new Error('Please check your email and password'));
    //       return;
    //     }

    //     // Create the access token
    //     const accessToken = sign({ userId: user.id }, JWT_SECRET, {
    //       expiresIn: JWT_EXPIRES_IN,
    //     });

    //     resolve(accessToken);
    //   } catch (err) {
    //     console.error('[Auth Api]: ', err);
    //     reject(new Error('Internal server error'));
    //   }
    // });
  }


  async register({ email, name, password }) {
    await wait(1000);

    return new Promise((resolve, reject) => {
      try {
        // Check if a user already exists
        let user = users.find(_user => _user.email === email);

        if (user) {
          reject(new Error('User already exists'));
          return;
        }

        user = {
          id: createResourceId(),
          avatar: undefined,
          email,
          name,
          password,
          plan: 'Standard',
        };

        users.push(user);

        const accessToken = sign({ userId: user.id }, JWT_SECRET, {
          expiresIn: JWT_EXPIRES_IN,
        });

        resolve(accessToken);
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  me(accessToken) {
    // NOTE: backend -> token.service.js -> generateAuthTokens

    return new Promise((resolve, reject) => {
      try {
        console.log(accessToken);

        const { hello, user } = decode(accessToken);

        if (!user) {
          reject(new Error('Invalid authorization token'));
          return;
        }

        resolve({
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          name: user.name,
          role: user.role,
          plan: user.plan,
        });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));

      }
    });
  }
}

export const authApi = new AuthApi();
