import axios from 'axios';

const BASE_URL = 'https://localhost:44390/api/';

const testInstance = axios.create({
  baseURL: BASE_URL + 'test/',
  headers: {
    'Content-Type': 'application/json',
  }
});

const userInstance = axios.create({
  baseURL: BASE_URL + 'user/',
});

const adminInstance = axios.create({
  baseURL: BASE_URL + 'admin/',
});


export const testAPI = {
  getTests({jobId, page}) {
    let url = `?page=${page}`;
    if (jobId) {
      url += `&jobId=${jobId}`;
    }
    return testInstance.get(url)
  },

  getFullTest(id) {
    return testInstance.get(`${id}`)
  },

  addTest(test) {
    return testInstance.post('addTest', test);
  },

  addQuestion(question) {
    return testInstance.post('addQuestion', question);
  },

  getQuestions({page, searchValue, limit}) {
    return testInstance.get(`questions?page=${page}&limit=${limit}&searchValue=${searchValue}`)
  },

  deleteQuestion(questionId) {
    return testInstance.delete(`deleteQuestion/${questionId}`)
  },

  acceptQuestion(questionId) {
    return testInstance.get(`acceptQuestion/${questionId}`)
  },

  updateQuestion(question) {
    return testInstance.put(`updateQuestion/${question.id}`, question)
  }
}

export const userAPI = {
  registerUser(user) {
    return userInstance.post('registration', user);
  },
  authorizateUser(login, password) {
    return userInstance.post('authorization', { login, password });
  },
  updateUser(user) {
    return userInstance.put('update', user);
  },
  getJobs() {
    return userInstance.get('jobs').then(({ data }) => data);
  },
  getTestResults(userId) {
    return userInstance.get(`getTestResults?userId=${userId}`);
  },
  setTestResult(testResult) {
    return userInstance.post('setTestResult', testResult);
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
  getTestResults(params) {
    console.log(`getTestResults?page=${params.currentPage}&sort=${params.sortBy.sort}`)
    return userInstance.get(`getTestResults?page=${params.currentPage}&sort=${params.sortBy.sort}`);
  }
}