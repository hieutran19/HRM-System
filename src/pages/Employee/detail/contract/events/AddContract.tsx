import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import styles from '../contract.module.css';
import { toast } from 'react-toastify';
import useLoading from '../../../../../hooks/useLoading';
import { Modal } from 'antd';
import Buttons from '../../../../../components/filed/Buttons';
import { DATE_FORMAT } from '../../../../../schemas/types';
import FormContract from '../form/FormContract';
import { addContract, genContractPDF, sendContractEmail } from '../../../../../services/apiContract';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { concatImage } from '../../../../../schemas/utils';

export default function AddContract(props) {
  const { setLoading } = useLoading();
  const { id, open, handleCancel, fetchData, isSelectEmployee } = props;
  const [isForm, setIsForm] = useState(true);
  const [contract, setContract] = useState(null);

  const initialValues = {
    employee_id: contract?.employee_id || id || '',
    start: contract?.start || dayjs().add(7, 'day').format(DATE_FORMAT),
    end: contract?.end || dayjs().add(6, 'month').add(6, 'day').format(DATE_FORMAT),
    type: contract?.type?.id || '1',
    position: contract?.position || '',
    director_manager: contract?.director_manager || 'Mr',
    director_name: contract?.director_name || '',
    designation: contract?.designation || '',
    allowance: contract?.allowance || [],
    acceptance_date: contract?.acceptance_date || dayjs().add(3, 'day').format(DATE_FORMAT),
    base_salary: contract?.base_salary || 0,
    attendance_allowance: contract?.attendance_allowance || 0,
    housing_allowance: contract?.housing_allowance || 0,
    performance_base: contract?.performance_base || 0,
    monthly_kpi_new_customers: contract?.monthly_kpi_new_customers || 0,
    monthly_kpi_renewed_customers: contract?.monthly_kpi_renewed_customers || 0,
    monthly_kpi_up_cross_sales: contract?.monthly_kpi_up_cross_sales || 0
  };

  const validationSchema = Yup.object().shape({
    start: Yup.string()
      .required('Start date is required')
      .test('isValidDate', 'Start must be a valid date', (value) => dayjs(value, DATE_FORMAT, true).isValid()),
    end: Yup.string()
      .required('End date is required')
      .test('isValidDate', 'End must be a valid date', (value) => dayjs(value, DATE_FORMAT, true).isValid())
      .test('isEndDateAfterStartDate', 'End date cannot be before start date', function (value) {
        const { start } = this.parent;
        const endDate = dayjs(value, DATE_FORMAT);
        const startDate = dayjs(start, DATE_FORMAT);
        return endDate.isAfter(startDate);
      }),
    type: Yup.string().required('Contract type is required'),
    position: Yup.string().required('Position applied is required'),
    director_name: Yup.string().required('Director name is required'),
    designation: Yup.string().required('Designation is required'),
    base_salary: Yup.number().min(0, 'Base salary cannot be less than 0'),
    attendance_allowance: Yup.number().min(0, 'Attendance allowance cannot be less than 0'),
    housing_allowance: Yup.number().min(0, 'Housing allowance cannot be less than 0'),
    performance_base: Yup.number().min(0, 'Performance base cannot be less than 0'),
    monthly_kpi_new_customers: Yup.number().min(0, 'New customers cannot be less than 0'),
    monthly_kpi_renewed_customers: Yup.number().min(0, 'Renewed customers cannot be less than 0'),
    monthly_kpi_up_cross_sales: Yup.number().min(0, 'Up/Cross sales cannot be less than 0')
  });

  const handelSendEmail = async () => {
    setLoading(true);
    try {
      await sendContractEmail(contract?.id);
      toast.success('Email contract sent successfully');
      handleCancel();
      setIsForm(true);
      setContract(null);
      fetchData();
    } catch (error) {
      toast.error('Email contract sent error');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values, actions) => {
    setLoading(true);
    try {
      if (values.type === '1' || values.type === '2') {
        values.attendance_allowance = 0;
        values.housing_allowance = 0;
      }
      const res = await addContract(values);
      const res1 = await genContractPDF(res?.data?.id);
      setContract(res1?.data?.contract);
      fetchData();
      setIsForm(false);
      setLoading(false);
      toast.success('Create contract successfully');
    } catch (error) {
      toast.error('Create contract error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <Modal
          className="modal"
          title={isForm ? 'Create Contract' : 'Preview Contract'}
          open={open}
          centered
          onCancel={() => {
            setIsForm(true);
            handleCancel();
            setContract(null);
          }}
          width={isForm ? 800 : 340}
          footer={false}
        >
          {isForm ? (
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
                    <FormContract formik={formik} isCreate={true} isSelectEmployee={isSelectEmployee} />
                    <div className="buttonBox">
                      <Buttons texts="Submit" types="submit" status="success" />
                      <Buttons
                        texts="Cancel"
                        status="cancel"
                        handleClick={() => {
                          handleCancel();
                          setIsForm(true);
                          setContract(null);
                        }}
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          ) : (
            <>
              <Link
                to={concatImage(contract?.attachment)}
                target={'_blank'}
                rel={'noopener noreferrer'}
                className={styles.previewModel}
              >
                <img src="/images/view-contract.png" alt="view-contract" />
                <span>Preview Contract</span>
              </Link>
              <div className="buttonBox">
                <Buttons texts="Send Email" status="success" handleClick={handelSendEmail} />
                <Buttons
                  texts="Cancel"
                  status="cancel"
                  handleClick={() => {
                    setIsForm(true);
                  }}
                />
              </div>
            </>
          )}
        </Modal>
      )}
    </>
  );
}
