import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import Backs from '../../../components/backs/Backs';
import useLoading from '../../../hooks/useLoading';
import styles from '../employee.module.css';
import FormEmployee from './forms/FormEmployee';
import Buttons from '../../../components/filed/Buttons';
import { useNavigate } from 'react-router-dom';
import Tiles from '../../../components/Titles/Tiles';
import { toast } from 'react-toastify';
import { addEmployee, getBankList } from '../../../services/apiEmployee';
import { DATE_FORMAT } from '../../../schemas/types';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

export default function AddEmployee() {
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const [bankList, setBankList] = useState(null);
  const [searchKey, setSearchKey] = useState();

  useEffect(() => {
    const fetchBankList = async () => {
      try {
        let params = {
          page: 1,
          perPage: 10000,
          seachKey: searchKey
        };
        const res = await getBankList(params);
        setBankList(res?.all_bankings);
      } catch (error) {
        console.log('Error fetch banklist');
      }
    };
    fetchBankList();
  }, []);

  const initialValues = bankList
    ? {
        name: '',
        personal_email: '',
        work_email: '',
        phone: '',
        position: '',
        department: '',
        mode: '1',
        level: '1',
        joining_date: dayjs().format(DATE_FORMAT),
        DOB: dayjs().format(DATE_FORMAT),
        probation: false,
        date_end_prob: dayjs().format(DATE_FORMAT),
        bank_name: bankList[0]?.abbreviation,
        bank_number: '',
        bank_branch: '',
        holder_name: ''
      }
    : {};
  const validationSchema = Yup.object().shape({
    // Basic Information Validation
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required'),
    personal_email: Yup.string().email('Invalid email').required('Personal Email is required'),
    work_email: Yup.string().email('Invalid email').required('Work Email is required'),

    // Job Information Validation
    department: Yup.string().required('Department is required'),
    position: Yup.string().required('Position is required'),

    // Bank Information Validation
    bank_name: Yup.string().required('Bank name is required'),
    bank_number: Yup.string().required('Bank number is required'),
    bank_branch: Yup.string().required('Bank branch is required'),
    holder_name: Yup.string().required('Bank holder name is required')
  });

  const onSubmit = async (values, actions) => {
    try {
      await addEmployee(values);
      toast.success('Create employee successfully');
      setLoading(true);
      navigate(-1);
    } catch (error) {
      if (error?.response?.status == 400) {
        toast.error(`${error?.response?.data?.error}`);
      } else {
        toast.error('Create employee error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.addEmployee}>
      <Backs types="link" ishowIcon={true} texts="Back" />
      <Tiles texts="Employee Create" fontSize={22} fontWeight={700} />
      {bankList && (
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(formik) => {
            return (
              <Form className={styles.forms}>
                <FormEmployee formik={formik} bankList={bankList} />
                <div className="buttonBox">
                  <Buttons texts="Submit" types="submit" status="success" />
                  <Buttons
                    texts="Cancel"
                    status="cancel"
                    handleClick={() => {
                      navigate(-1);
                    }}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
}
