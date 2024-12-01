import { InputNumber } from 'antd';
import Dates from '../../../../components/dates/Dates';
import Inputs from '../../../../components/filed/Inputs';
import styles from './formEmployee.module.css';
import InputsNumber from '../../../../components/filed/InputsNumber';
import InputsMoney from '../../../../components/filed/InputsMoney';

export default function FormPayslip(props: any) {
  const { formik } = props;

  return (
    <div className={styles.formPayslip}>
      <Dates
        wrap
        show="month"
        labels="Time"
        required={true}
        name="time"
        defaultValue={formik.values.time}
        onChange={(date, dateString) => {
          formik.setFieldValue('time', dateString);
        }}
        errors={formik.errors.time}
      />
      <InputsNumber
        wrap
        labels="PTO"
        required={true}
        name="pto"
        placeholder={'PTO'}
        value={formik.values.pto}
        onChange={formik.handleChange}
        touched={formik.touched.pto}
        errors={formik.errors.pto}
      />
      <InputsNumber
        wrap
        labels="Attendance"
        decimalPlaces={2}
        step={0.01}
        min={0}
        max={1}
        required={true}
        name="attendance"
        placeholder={'Attendance'}
        value={formik.values.attendance}
        onChange={formik.handleChange}
        touched={formik.touched.attendance}
        errors={formik.errors.attendance}
      />
      <InputsMoney
        wrap
        labels="Lunch Advance"
        required={true}
        name="lunch_advance"
        placeholder={'Lunch Advance'}
        value={formik.values.lunch_advance}
        onChange={formik.handleChange}
        touched={formik.touched.lunch_advance}
        errors={formik.errors.lunch_advance}
      />
      <InputsMoney
        wrap
        labels="Drink Advance"
        required={true}
        name="drink_advance"
        placeholder={'Drink Advance'}
        value={formik.values.drink_advance}
        onChange={formik.handleChange}
        touched={formik.touched.drink_advance}
        errors={formik.errors.drink_advance}
      />
      <InputsMoney
        wrap
        labels="Claim"
        required={true}
        name="claim"
        placeholder={'Claim'}
        value={formik.values.claim}
        onChange={formik.handleChange}
        touched={formik.touched.claim}
        errors={formik.errors.claim}
      />
    </div>
  );
}
