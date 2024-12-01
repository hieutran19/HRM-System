import { createAxios } from './axios';

const axiosInstance = createAxios();

const getUniversity = async (params: any) => {
  const page = params?.page || 1;
    const per_page = params?.perPage || 5;
    const searchKey = params?.searchKey || '';
    let url=`education/api/get_university?page=${page}&per_page=${per_page}&search=${searchKey}`
  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUniversityDetail = async (id?: string) => {
  try {
    const response = await axiosInstance.get(`education/api/get_university/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addUniversity = async (value: any) => {
  try {
    const response = await axiosInstance.post(`education/api/create_university`, value);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const editUniversity = async (id: any, value: any) => {
  try {
    const response = await axiosInstance.post(`education/api/update_university/${id}`, value);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const deleteUniversity = async (id: any) => {
  try {
    const response = await axiosInstance.post(`education/api/delete_university/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
    getUniversity,
    getUniversityDetail,
    addUniversity,
    editUniversity,
    deleteUniversity
}