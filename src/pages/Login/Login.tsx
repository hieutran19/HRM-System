import { Form, Formik } from 'formik';
import { userLogin } from '../../services/apiUser';
import { toast } from 'react-toastify';
import styles from './login.module.css';
import Buttons from '../../components/filed/Buttons';
import Inputs from '../../components/filed/Inputs';
import useAuth from '../../hooks/useAuth';
import OauthBtn from '../Oauth/Oauth';
import * as Yup from 'yup';

export default function Login() {
  const { login } = useAuth();

  const initialValues = {
    username: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    // Basic Information Validation
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });

  const onSubmit = async (values, actions) => {
    try {
      const res = await userLogin(values);
      login(res?.data?.token, res?.data?.refresh_token, true);
    } catch (error) {
      toast.error('Login error');
    } finally {
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues || {}}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className={styles.forms}>
              <div className={styles.formHeading}>
                <h2>Sign In</h2>
              </div>
              <div className={styles.contentBox}>
                <div className={styles.imgBox}>
                  <img src="/images/SignIn.png" alt="sign in" />
                </div>
                <div className={styles.formBox}>
                  <Inputs
                    customClass={styles.loginInput}
                    wrap
                    labels="Username"
                    required={true}
                    type="text"
                    name="username"
                    placeholder={'Username'}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    touched={formik.touched.username}
                    errors={formik.errors.username && formik.touched.username && formik.errors.username}
                  />
                  <Inputs
                    wrap
                    customClass={styles.loginInput}
                    labels="Password"
                    required={true}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    touched={formik.touched.password}
                    errors={formik.errors.password && formik.touched.password && formik.errors.password}
                  />
                  <div className={styles.buttonBox}>
                    <Buttons texts="Login" types="submit" status="success" />
                    <OauthBtn />
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
