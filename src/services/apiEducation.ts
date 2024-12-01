import { createAxios } from './axios';

const axiosInstance = createAxios();

const getEducation = async () => {
  try {
    const response = await axiosInstance.get(`/education/get_education`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getEducationDetail = async (id) => {
  try {
    const response = await axiosInstance.get(`/education/get_education/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getEducationByEmployee = async (params: any) => {
    const page = params?.page || 1;
    const per_page = params?.perPage || 5;
    const id = params?.id || 5;

  let url = `/education/get_education_of_employee/${id}?page=${page}&per_page=${per_page}&sort=-id&employee_id`;

  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const addEducation = async (value) => {
  try {
    const response = await axiosInstance.post(`/education/create_education`, value);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const editEducation = async (id, value) => {
  try {
    const response = await axiosInstance.post(`/education/update_education/${id}`, value);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const deleteEducation = async (id) => {
  try {
    const response = await axiosInstance.post(`/education/delete_education/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getDegreeTypes = async (params?: any) => {
   const page = params?.page || 1;
    const per_page = params?.perPage || 0;
  try {
    const response = await axiosInstance.get(`/education/degree/get_degree_type?page=${page}&per_page=${per_page}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
    getEducation, getEducationDetail, getEducationByEmployee, addEducation, editEducation, deleteEducation, getDegreeTypes
    
}