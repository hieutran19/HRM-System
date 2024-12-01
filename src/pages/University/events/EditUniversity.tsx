import { Form, Formik } from 'formik';
import styles from '../university.module.css';
import { toast } from 'react-toastify';
import { Modal } from 'antd';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import useLoading from '../../../hooks/useLoading';
import { getAllCountry } from '../../../services/apiCountry';
import { editUniversity, getUniversityDetail } from '../../../services/apiUniversity';
import Buttons from '../../../components/filed/Buttons';
import FormUniversity from '../forms/FormUniversity';

export default function EditUniversity(props: any) {
  const { setLoading } = useLoading();
  const { id, open, handleCancel, fetchData } = props;
  const [country, setCountry] = useState(null);
  const [university, setUniversity] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 1000;

  const fetchCountry = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        perPage: perPage
      };
      const res = await getAllCountry(params);
      setCountry(res?.data?.country);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUniversity = async () => {
    setLoading(true);
    try {
      const res = await getUniversityDetail(id);
      setUniversity(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCountry();
  }, []);

  useEffect(() => {
    fetchUniversity();
  }, [open]);

  const initialValues = {
    id: university?.id || '',
    name: university?.name || '',
    english_name: university?.english_name || '',
    original_name: university?.original_name || '',
    country: university?.country || (country && country[0]?.id),
    location: university?.location || '',
    ranking: university?.ranking || 0
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must not exceed 50 characters'),

    english_name: Yup.string()
      .required('English name is required')
      .min(2, 'English name must be at least 2 characters')
      .max(100, 'English name must not exceed 50 characters'),

    original_name: Yup.string()
      .required('Original name is required')
      .min(2, 'Original name must be at least 2 characters')
      .max(100, 'Original name must not exceed 50 characters'),
    location: Yup.string().required('Location is required'),
    ranking: Yup.number().min(0, 'Ranking cannot be less than 0')
  });

  const onSubmit = async (values, actions) => {
    setLoading(true);
    try {
      await editUniversity(id, values);
      toast.success('Update university successfully');
      fetchData();
      handleCancel();
      actions.resetForm();
    } catch (error) {
      toast.error('Update contract error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <Modal
          className="modal"
          title="Update University"
          open={open}
          centered
          onCancel={handleCancel}
          width={800}
          footer={false}
        >
          {country && (
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
                    <FormUniversity formik={formik} country={country} />
                    <div className="buttonBox">
                      <Buttons texts="Submit" types="submit" status="success" />
                      <Buttons texts="Cancel" status="cancel" handleClick={handleCancel} />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          )}
        </Modal>
      )}
    </>
  );
}
