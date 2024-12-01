import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'; // Import the plugin
import { Form, Formik } from 'formik';
import styles from '../education.module.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useLoading from '../../../../../hooks/useLoading';
import { Modal } from 'antd';
import Buttons from '../../../../../components/filed/Buttons';
import { MONTH_FORMAT } from '../../../../../schemas/types';
import { addEducation, getDegreeTypes } from '../../../../../services/apiEducation';
import FormEducation from '../form/FormEducation';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';

dayjs.extend(isSameOrAfter);

export default function AddEducation(props: any) {
  const { id } = useParams();
  const { setLoading } = useLoading();
  const { open, handleCancel, fetchData } = props;
  const [degrees, setDegrees] = useState([]);

  const fetchDegreeType = async () => {
    try {
      const res = await getDegreeTypes();
      setDegrees(res?.data?.degree_type);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDegreeType();
  }, []);

  const initialValues = {
    employee_id: id,
    university_id: '',
    major: '',
    degree_type: degrees[0]?.id,
    start_date: dayjs().format(MONTH_FORMAT),
    end_date: dayjs().format(MONTH_FORMAT),
    gpa: 0.0
  };

  const validationSchema = Yup.object().shape({
    university_id: Yup.string().required('University is required'),
    major: Yup.string().required('Major is required'),
    degree_type: Yup.string().required('Degree type is required'),
    start_date: Yup.string()
      .required('Start date is required')
      .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Start date must be in MM/YYYY format'),
    end_date: Yup.string()
      .required('End date is required')
      .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'End date must be in MM/YYYY format')
      .test('is-after-start', 'End date cannot be before start date', function (value) {
        const { start_date } = this.parent;
        if (!value || !start_date) return true; // skip validation if either date is missing
        const start = dayjs(start_date, 'MM/YYYY');
        const end = dayjs(value, 'MM/YYYY');
        return end.isSameOrAfter(start);
      })
  });

  const onSubmit = async (values, actions) => {
    setLoading(true);
    try {
      await addEducation(values);
      toast.success('Create education successfully');
      fetchData();
      handleCancel();
      actions.resetForm();
    } catch (error) {
      toast.error('Create education error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <Modal
          className="modal"
          title="Create Education"
          open={open}
          centered
          onCancel={handleCancel}
          width={800}
          footer={false}
        >
          <Formik
            enableReinitialize={true}
            initialValues={initialValues || {}}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {(formik) => {
              return (
                <Form className={styles.forms}>
                  <FormEducation formik={formik} degrees={degrees} />
                  <div className="buttonBox">
                    <Buttons texts="Submit" types="submit" status="success" />
                    <Buttons texts="Cancel" status="cancel" handleClick={handleCancel} />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Modal>
      )}
    </>
  );
}
