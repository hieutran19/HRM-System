import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import styles from '../contract.module.css';
import { toast } from 'react-toastify';
import useLoading from '../../../../../hooks/useLoading';
import { Modal } from 'antd';
import Buttons from '../../../../../components/filed/Buttons';
import { DATE_FORMAT } from '../../../../../schemas/types';
import FormContract from '../form/FormContract';
import { useEffect, useState } from 'react';
import { editContract, genContractPDF, getContractDetail } from '../../../../../services/apiContract';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  start: Yup.string()
    .required('Start date is required')
    .test('isValidDate', 'Start must be a valid date', (value) => dayjs(value, DATE_FORMAT, true).isValid()),
  end: Yup.string()
    .required('End date is required')
    .test('isValidDate', 'End must be a valid date', (value) => dayjs(value, DATE_FORMAT, true).isValid())
    .test('isEndDateAfterStartDate', 'End date cannot be before start date', function (value) {
      const { start } = this.parent; // Access the start date from the parent object
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
  housing_allowance: Yup.number().min(0, 'Housing allowance cannot be less than 0')
});

export default function EditContract(props: any) {
  const { contractId, id, open, handleCancel, fetchData } = props;
  const { setLoading } = useLoading();
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    const fetchContract = async () => {
      setLoading(true); // Start loading
      try {
        const res = await getContractDetail(contractId);
        setContract(res?.data);
      } catch (error) {
        console.log('Error fetching contract', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    if (contractId) {
      fetchContract();
    }
  }, [contractId, open]);

  const onSubmit = async (values, actions) => {
    setLoading(true);
    try {
      if (values.type === '1' || values.type === '2') {
        values.attendance_allowance = 0;
        values.housing_allowance = 0;
      }
      const res = await editContract(values);
      toast.success('Update contract successfully');
      fetchData();
      handleCancel();
      setLoading(false);
      actions.resetForm();
      try {
        await genContractPDF(res?.data?.id);
      } catch (error) {
        toast.error('Generate PDF contract error');
      }
    } catch (error) {
      toast.error('Update contract error');
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    id: contractId,
    employee_id: id || contract?.employee_id || '',
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
    housing_allowance: contract?.housing_allowance || 0
  };

  return (
    <>
      {open && (
        <Modal
          className="modal"
          title="Update Contract"
          open={open}
          centered
          onCancel={handleCancel}
          width={800}
          footer={false}
        >
          {contract && (
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {(formik) => (
                <Form className={styles.forms}>
                  <FormContract formik={formik} />
                  <div className="buttonBox">
                    <Buttons texts="Submit" types="submit" status="success" />
                    <Buttons texts="Cancel" status="cancel" handleClick={handleCancel} />
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </Modal>
      )}
    </>
  );
}
