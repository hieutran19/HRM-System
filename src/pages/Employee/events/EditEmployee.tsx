import { Form, Formik } from 'formik';
import Backs from '../../../components/backs/Backs';
import useLoading from '../../../hooks/useLoading';
import styles from '../employee.module.css';
import FormEmployee from './forms/FormEmployee';
import Buttons from '../../../components/filed/Buttons';
import { useNavigate, useParams } from 'react-router-dom';
import Tiles from '../../../components/Titles/Tiles';
import { toast } from 'react-toastify';
import { editEmployee, getEmployee } from '../../../services/apiEmployee';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

export default function EditEmployee() {
  const { id } = useParams();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null); // Initialize as null

  const fetchEmployee = async () => {
    setLoading(true); // Start loading
    try {
      const res = await getEmployee(id);
      setEmployee(res?.data);
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

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const initialValues = employee
    ? {
        id: employee?.id,
        name: employee?.name || '',
        personal_email: employee?.personal_email || '',
        work_email: employee?.work_email || '',
        phone: employee?.phone || '',
        position: employee?.position || '',
        department: employee?.department || '',
        mode: employee?.mode?.id || '',
        level: employee?.level?.id || '',
        joining_date: employee?.joining_date || '',
        DOB: employee?.DOB || '',
        probation: employee?.probation || false,
        date_end_prob: employee?.date_end_prob || '',
        bank_name: employee?.bank_name?.abbreviation || '',
        bank_number: employee?.bank_number || '',
        bank_branch: employee?.bank_branch || '',
        holder_name: employee?.holder_name || '',
        pic_id: employee?.pic?.id || '',
        report_manager: employee?.report_manager?.id || '',
        based_in: employee?.based_in?.id || ''
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
    holder_name: Yup.string().required('Bank holder name is required'),
    pic_id: Yup.string().required('HR In Charge is required'),
    report_manager: Yup.string().required('Report manager is required'),
    based_in: Yup.string().required('Based In is required')
  });

  const onSubmit = async (values, actions) => {
    try {
      await editEmployee(values);
      toast.success('Update employee successfully');
      navigate(-1);
    } catch (error) {
      if (error?.response?.status == 400) {
        toast.error(`${error?.response?.data?.error}`);
      } else {
        toast.error('Update employee error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.addEmployee}>
      <Backs types="link" ishowIcon={true} texts="Back" />
      <Tiles texts="Employee Update" fontSize={22} fontWeight={700} />
      {employee && (
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(formik) => (
            <Form className={styles.forms}>
              <FormEmployee formik={formik} employee={employee} />
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
          )}
        </Formik>
      )}
    </div>
  );
}
