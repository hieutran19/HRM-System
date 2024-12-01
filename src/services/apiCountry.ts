import { createAxios } from './axios';

const axiosInstance = createAxios();

const getAllCountry = async (params: any) => {
  const page = params?.page || 1;
    const per_page = params?.perPage || 5;
    const searchKey = params?.searchKey || '';
    let url=`education/api/get_country?page=${page}&per_page=${per_page}&search=${searchKey}`
  try {

    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
    getAllCountry
}