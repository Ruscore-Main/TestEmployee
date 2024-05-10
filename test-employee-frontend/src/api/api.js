import axios from 'axios';

const BASE_URL = 'https://localhost:44390/api/';

const testInstance = axios.create({
  baseURL: BASE_URL + 'test/',
});

const userInstance = axios.create({
  baseURL: BASE_URL + 'user/',
});

const adminInstance = axios.create({
  baseURL: BASE_URL + 'admin/',
});


export const testAPI = {

}

export const userAPI = {
  registerUser(user) {
    return userInstance.post('registration', user);
  },
  authorizateUser(login, password) {
    return userInstance.post('authorization', { login, password });
  },
  updateUser(user) {
    return userInstance.post('update', user);
  },
  getJobs() {
    return userInstance.get('jobs').then(({ data }) => data);
  }
};

export const adminAPI = {
  getUsers({page, searchValue, limit}) {
    let fetchURL = `users?page=${page}&limit=${limit}`;

    if (searchValue !== "") {
      fetchURL += `&searchValue=${searchValue}`;
    }
    return adminInstance.get(fetchURL).then(({ data }) => data);
  },
}