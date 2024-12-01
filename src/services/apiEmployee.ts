import { createAxios } from './axios';

const axiosInstance = createAxios();

const getEmployees = async (params: any) => {
  const page = params?.page || 1;
  const per_page = params?.perPage || 0;
  const searchKey = params?.searchKey || '';
  const status = params?.status || '';
  const mode = params?.mode || '';
  const level = params?.level || '';
  const department = params?.department || '';
  const based_in = params?.based_in || '';
  const position = params?.position || '';
  const sort = params?.sort || '';


  let url = `/employee/get_employee?page=${page}&per_page=${per_page}&search=${searchKey}&status=${status}&mode=${mode}&department=${department}&level=${level}&based_in=${based_in}&position=${position}&sort=${sort}`;

  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getEmployee = async (id?: string) => {
  try {
    const response = await axiosInstance.get(`/employee/get_employee/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addEmployee = async (value) => {
  try {
    const response = await axiosInstance.post(`/employee/create_employee`, value);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const editEmployee = async (value) => {
  try {
    const response = await axiosInstance.post(`/employee/update_employee`, value);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const deleteEmployee = async (id) => {
  try {
    const response = await axiosInstance.post(`/employee/delete_employee/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


const getBankList = async (params: any) => {
   const page = params?.page || 1;
    const per_page = params?.perPage || 5;
    const searchKey = params?.searchKey || '';

  let url = `/employee/get_all_banking_VN?page=${page}&per_page=${per_page}&search=${searchKey}`;

  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const getHRs = async (params: any) => {
  const page = params?.page || 1;
  const per_page = params?.perPage || 0;
  const searchKey = params?.searchKey || '';

  let url = `/employee/hr/hr_in_charge?page=${page}&per_page=${per_page}&search=${searchKey}`;

  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getManagers = async (params: any) => {
  const page = params?.page || 1;
  const per_page = params?.perPage || 0;
  const searchKey = params?.searchKey || '';

  let url = `/employee/get_report_manager?page=${page}&per_page=${per_page}&search=${searchKey}`;

  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getEmployeeFormContract = async (params: any) => {
  const page = params?.page || 1;
  const per_page = params?.perPage || 0;
  const searchKey = params?.searchKey || '';
  let url = `/employee/contract/create?page=${page}&per_page=${per_page}&search=${searchKey}`;

  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getDepartments = async () => {
  let url = `/employee/dropdown/get_departments`;

  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getPositons = async (params: any) => {
  const page = params?.page || 1;
  const per_page = params?.perPage || 0;
  const searchKey = params?.searchKey || '';
  let url = `/employee/dropdown/get_positions?page=${page}&per_page=${per_page}&search=${searchKey}`;

  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export { getEmployees, getEmployee, addEmployee, editEmployee, deleteEmployee,
   getBankList, getHRs, getManagers, getEmployeeFormContract, getDepartments, getPositons };