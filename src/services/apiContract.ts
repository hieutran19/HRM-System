import { createAxios } from './axios';

const axiosInstance = createAxios();

const getContract = async (params) => {
  const page = params?.page || 1;
  const per_page = params?.perPage || 5;
   const searchKey = params?.searchKey || '';
  const status = params?.status || '';

  let url =`/contract/get_contract?page=${page}&per_page=${per_page}&search=${searchKey}&status=${status}&sort=-start,-end`
  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getContractActive = async (params) => {
  const page = params?.page || 1;
  const per_page = params?.perPage || 5;
  let url =`/contract/get_active_contract?page=${page}&per_page=${per_page}&sort=-id`
  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getContractDetail = async (id) => {
  try {
    const response = await axiosInstance.get(`/contract/get_contract/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getContractByEmployee = async (params: any) => {
    const page = params?.page || 1;
    const per_page = params?.perPage || 5;
    const id = params?.id || 5;

  let url = `/contract/get_contract_by_employee?page=${page}&per_page=${per_page}&sort=-id&employee_id=${id}`;

  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const addContract = async (value) => {
  try {
    const response = await axiosInstance.post(`/contract/create_contract`, value);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const editContract = async (value) => {
  try {
    const response = await axiosInstance.post(`/contract/update_contract`, value);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteContract = async (id) => {
  try {
    const response = await axiosInstance.post(`/contract/delete_contract/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const genContractPDF = async (id) => {
  try {
    const response = await axiosInstance.post(`/contract/generate_contract_pdf/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const sendContractEmail = async (id) => {
   try {
    const response = await axiosInstance.post(`/contract/new_contract/send_email`, {id});
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { 
  getContract, getContractByEmployee, addContract, editContract, getContractDetail, deleteContract,
getContractActive, genContractPDF, sendContractEmail };