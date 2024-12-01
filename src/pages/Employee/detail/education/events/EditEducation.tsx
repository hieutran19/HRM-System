import { Form, Formik } from 'formik';
import styles from '../education.module.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useLoading from '../../../../../hooks/useLoading';
import { Modal } from 'antd';
import Buttons from '../../../../../components/filed/Buttons';
import { editEducation, getDegreeTypes, getEducationDetail } from '../../../../../services/apiEducation';
import FormEducation from '../form/FormEducation';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import dayjs from 'dayjs';

export default function EditEducation(props: any) {
  const educationId = props.id;
  const { id } = useParams();
  const { setLoading } = useLoading();
  const { open, handleCancel, fetchData } = props;
  const [education, setEducation] = useState();

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

  const [initialValues, setInitialValues] = useState<any>({
    employee_id: id,
    major: '',
    university_id: '',
    start_date: '',
    end_date: '',
    graduated: false,
    degree_type: degrees[0]?.id,
    gpa: 0.0
  });

  const fetchEducation = async () => {
    setLoading(true);
    try {
      const res = await getEducationDetail(educationId);
      setEducation(res.data);
      setInitialValues({
        employee_id: id,
        university_id: res?.data?.university?.id || '',
        major: res?.data?.major || '',
        start_date: res?.data?.start_date || '',
        end_date: res?.data?.end_date || '',
        graduated: res?.data?.graduated || false,
        degree_type: res?.data?.employee_degree?.id || degrees[0]?.id,
        gpa: res?.data?.gpa || 0.0
      });
    } catch (error) {
      console.log('Error getting education details', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, [educationId, id, open]);

  const validationSchema = Yup.object().shape({
    major: Yup.string().required('Major is required'),
    start_date: Yup.string().required('Start date is required'),
    end_date: Yup.string()
      .required('End date is required')
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
      await editEducation(educationId, values);
      toast.success('Update education successfully');
      fetchData();
      handleCancel();
      actions.resetForm();
    } catch (error) {
      toast.error('Update education error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <Modal
          className="modal"
          title="Update Education"
          open={open}
          centered
          onCancel={handleCancel}
          width={800}
          footer={false}
        >
          {education && (
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
                  <FormEducation formik={formik} isShowFiled={false} education={education} degrees={degrees} />
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
