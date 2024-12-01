import { createAxios } from './axios';

const axiosInstance = createAxios();

const getAllEvents = async () => {
  let url=`event/all_events`
  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
    getAllEvents
}