import axios from 'axios';

const BASE_URL = 'https://localhost:44390/api/';

const testInstance = axios.create({
  baseURL: BASE_URL + 'test/',
});

const userInstance = axios.create({
  baseURL: BASE_URL + 'user/',
});

export const testAPI = {
  getJobs() {
    return testInstance.get('jobs').then(({ data }) => data);
  }
}

export const userAPI = {
  registerUser(login, password, email, phoneNumber, role) {
    return userInstance.post('registration', {
      login,
      password,
      email,
      phoneNumber,
      role,
    });
  },
  authorizateUser(login, password) {
    return userInstance.post('authorization', { login, password });
  },
  updateUser(user) {
    return userInstance.post('update', user);
  },
};
