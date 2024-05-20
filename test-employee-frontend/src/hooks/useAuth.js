import { useSelector } from 'react-redux';

export const useAuth = () => {
  const {
    id,
    login,
    role,
    fio,
    workExperience,
    dateOfBirth,
    email,
    phoneNumber,
    jobId,
    jobTitle,
    testResults,
  } = useSelector(({ user }) => user);
  
  return {
    isAuth: !!login,
    id,
    login,
    role,
    fio,
    workExperience,
    dateOfBirth,
    email,
    phoneNumber,
    jobId,
    jobTitle,
    testResults,
  };
};
