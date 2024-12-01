import { Form, Formik } from 'formik';
import styles from '../employee.module.css';
import { toast } from 'react-toastify';
import { Modal } from 'antd';
import * as Yup from 'yup';
import useLoading from '../../../hooks/useLoading';
import Buttons from '../../../components/filed/Buttons';
import FormPayslip from './forms/FormPayslip';
import dayjs from 'dayjs';
import { MONTH_FORMAT } from '../../../schemas/types';
import { genPayslip, sendEmailPayslip } from '../../../services/apiPayslip';
import { useState } from 'react';
import { formatMoney } from '../../../schemas/utils';

export default function GeneratePayslip(props: any) {
  const { setLoading } = useLoading();
  const { open, handleCancel, employee_id } = props;
  const [isForm, setIsForm] = useState(true);
  const [payslip, setPayslip] = useState(null);

  const initialValues = {
    employee_id: employee_id,
    time: payslip?.time || dayjs().subtract(1, 'month').format(MONTH_FORMAT),
    pto: (payslip?.pto == -1 ? 0 : payslip?.pto) || 0,
    attendance: payslip?.attendance || 1,
    lunch_advance: payslip?.lunch_advance || 0,
    drink_advance: payslip?.drink_advance || 0,
    claim: payslip?.claim || 0
  };

  const validationSchema = Yup.object().shape({
    pto: Yup.number().required('This field is required'),
    attendance: Yup.number().required('This field is required'),
    lunch_advance: Yup.number().required('This field is required'),
    drink_advance: Yup.number().required('This field is required'),
    claim: Yup.number().required('This field is required')
  });

  const onSubmit = async (values, actions) => {
    setLoading(true);
    try {
      const res = await genPayslip(values);
      setPayslip(res?.data?.payslip);
      toast.success('Generate payslip successfully');
      setLoading(false);
      setIsForm(false);
    } catch (error) {
      toast.error('Generate payslip error');
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async () => {
    try {
      await sendEmailPayslip(payslip?.id);
      toast.success('Email payslip sent successfully');
      handleCancel();
      setIsForm(true);
      setPayslip(null);
    } catch (error) {
      toast.error('Email sent error');
    }
  };

  return (
    <>
      {open && (
        <Modal
          className="modal"
          title="Payslip Information"
          open={open}
          centered
          onCancel={() => {
            handleCancel();
            setIsForm(true);
            setPayslip(null);
          }}
          width={isForm ? 800 : 500}
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
                    <FormPayslip formik={formik} />
                    <div className="buttonBox">
                      <Buttons texts="Submit" types="submit" status="success" />
                      <Buttons
                        texts="Cancel"
                        status="cancel"
                        handleClick={() => {
                          handleCancel();
                          setIsForm(true);
                          setPayslip(null);
                        }}
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          ) : (
            <>
              <div className={styles.payslipDetail}>
                <table className={styles.payslipTable}>
                  <tbody>
                    <tr className={styles.itemLevel1}>
                      <td>Gross Salary</td>
                      <td>{formatMoney(payslip?.contract?.gross_salary)}</td>
                    </tr>
                    <tr className={styles.itemLevel2}>
                      <td>Insurance</td>
                      <td>{formatMoney(payslip?.contract?.insurance_employee)}</td>
                    </tr>
                    <tr className={styles.itemLevel1}>
                      <td>Net Salary</td>
                      <td>{formatMoney(payslip?.contract?.net_salary)}</td>
                    </tr>
                    <tr className={styles.itemLevel2}>
                      <td>PTO</td>
                      <td>{payslip?.pto == -1 ? 'N/A' : payslip?.pto}</td>
                    </tr>
                    <tr className={styles.itemLevel2}>
                      <td>Attendance</td>
                      <td>
                        {typeof payslip?.attendance === 'number' && !isNaN(payslip?.attendance)
                          ? `${payslip.attendance * 100}%`
                          : '0%'}
                      </td>
                    </tr>
                    <tr className={styles.itemLevel1}>
                      <td>Month Salary</td>
                      <td>{formatMoney(payslip?.month_salary)}</td>
                    </tr>
                    <tr className={styles.itemLevel2}>
                      <td>Lunch Advance</td>
                      <td>{formatMoney(payslip?.lunch_advance)}</td>
                    </tr>
                    <tr className={styles.itemLevel2}>
                      <td>Drink Advance</td>
                      <td>{formatMoney(payslip?.drink_advance)}</td>
                    </tr>
                    <tr className={styles.itemLevel2}>
                      <td>Claim</td>
                      <td>{formatMoney(payslip?.claim)}</td>
                    </tr>
                    <tr className={styles.itemLevel1}>
                      <td>E-banking</td>
                      <td>{formatMoney(payslip?.ebanking)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="buttonBox">
                <Buttons texts="Send Email" status="success" handleClick={sendEmail} />
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
