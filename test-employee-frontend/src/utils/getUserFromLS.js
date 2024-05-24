export const getUserFromLS = () => {
    const data = localStorage.getItem('user')
    return data ? JSON.parse(data) : {
        id: null,
        login: null,
        password: null,
        role: null,
        fio: null,
        workExperience: null,
        dateOfBirth: null,
        email: null,
        phoneNumber: null,
        jobId: null,
        jobTitle: "",
        testResults: []
    };
}