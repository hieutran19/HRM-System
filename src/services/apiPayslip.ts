import { createAxios } from './axios';

const axiosInstance = createAxios();

const getPayslip = async (id?: any) => {
    let url=`api/v1/hrm/employee/payslip/get_payslip?id=${id}`
  try {

    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const genPayslip = async (values: any) => {
    let url=`api/v1/hrm/employee/payslip/generate_payslip`
  try {

    const response = await axiosInstance.post(url, values);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const sendEmailPayslip = async (payslip_id: any) => {
    let url=`api/v1/hrm/employee/payslip/send_email_payslip`
  try {

    const response = await axiosInstance.post(url, {payslip_id});
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
    getPayslip,
    genPayslip,
    sendEmailPayslip
}