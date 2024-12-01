import dayjs from 'dayjs';
import Dates from '../../../../../components/dates/Dates';
import Checkboxes from '../../../../../components/filed/Checkbox';
import Inputs from '../../../../../components/filed/Inputs';
import Radios from '../../../../../components/filed/Radios';
import Selects from '../../../../../components/filed/Selects';
import { typeContractOptions } from '../../../../../schemas/selectData';
import styles from './formContract.module.css';
import { DATE_FORMAT } from '../../../../../schemas/types';
import SelectAPI from '../../../../../components/filed/SelectAPI';
import { getEmployeeFormContract } from '../../../../../services/apiEmployee';
import InputsMoney from '../../../../../components/filed/InputsMoney';
import InputsNumber from '../../../../../components/filed/InputsNumber';

export default function FormContract(props: any) {
  const { formik, isCreate = false, isSelectEmployee } = props;

  const calculateEndDate = (startDate: string, type: any): string => {
    if (!startDate) return '';

    const parsedStartDate = dayjs(startDate, DATE_FORMAT);
    return type == 1
      ? parsedStartDate.add(6, 'month').subtract(1, 'day').format(DATE_FORMAT)
      : type == 2
      ? parsedStartDate.add(2, 'month').subtract(1, 'day').format(DATE_FORMAT)
      : parsedStartDate.add(2, 'year').subtract(1, 'day').format(DATE_FORMAT);
  };

  const calculateAcceptanceDate = (startDate: string): string => {
    if (!startDate) return '';

    const parsedStartDate = dayjs(startDate, DATE_FORMAT);
    return parsedStartDate.add(3, 'day').format(DATE_FORMAT);
  };

  const handleStartDateChange = (date: any, dateString: string) => {
    formik.setFieldValue('start', dateString);

    if (isCreate) {
      const endDate = calculateEndDate(dateString, formik.values.type);
      formik.setFieldValue('end', endDate);

      const acceptanceDate = calculateAcceptanceDate(dateString);
      formik.setFieldValue('acceptance_date', acceptanceDate);
    }
  };

  const handleTypeChange = (value: string) => {
    formik.setFieldValue('type', value);
    if (formik.values.start) {
      const endDate = calculateEndDate(formik.values.start, value);
      formik.setFieldValue('end', endDate);
    }
  };

  return (
    <div className={styles.formContract}>
      {isSelectEmployee && (
        <SelectAPI
          customClass={styles.selectItem}
          wrap
          labels="Employee"
          name="employee_id"
          value={formik?.values?.employee_id}
          required={true}
          show="employee"
          handleChange={(value) => {
            formik.setFieldValue('employee_id', value);
          }}
          optionsAPI={getEmployeeFormContract}
          setDefaultValue={(defaultValue) => formik.setFieldValue('employee_id', defaultValue)}
        />
      )}
      <Inputs
        wrap
        labels="Position"
        required={true}
        id="position"
        type="text"
        name="position"
        placeholder={'Position'}
        value={formik.values.position}
        onChange={formik.handleChange}
        touched={formik.touched.position}
        errors={formik.errors.position}
      />
      <Selects
        wrap
        labels="Type"
        name="type"
        value={formik.values.type}
        required={true}
        options={typeContractOptions}
        handleChange={handleTypeChange}
      />
      <Dates
        wrap
        labels="Start Date"
        required={true}
        name="start"
        defaultValue={formik.values.start}
        onChange={handleStartDateChange}
        errors={formik.errors.start}
      />
      {formik.values.type != 4 && (
        <Dates
          wrap
          labels="End Date"
          required={true}
          name="end"
          defaultValue={formik.values.end}
          onChange={(date, dateString) => {
            formik.setFieldValue('end', dateString);
          }}
          errors={formik.errors.end}
        />
      )}
      <div className={styles.itemFull}>
        <label>Direct Manager</label>
        <div className={styles.itemFullBox}>
          <div className={styles.twoItem}>
            <Radios
              labels="Title"
              wrap
              required={true}
              name="director_manager"
              value={formik.values.director_manager}
              onChange={formik.handleChange}
              touched={formik.touched.director_manager}
              errors={formik.errors.director_manager}
              options={[
                { value: 'Mr', label: 'Mr.' },
                { value: 'Ms', label: 'Ms.' }
              ]}
            />
            <Inputs
              wrap
              labels="Name"
              required={true}
              type="text"
              name="director_name"
              placeholder={'Name'}
              value={formik.values.director_name}
              onChange={formik.handleChange}
              touched={formik.touched.director_name}
              errors={formik.errors.director_name}
            />
          </div>
          <Inputs
            wrap
            labels="Designation"
            required={true}
            type="text"
            name="designation"
            placeholder={'Name'}
            value={formik.values.designation}
            onChange={formik.handleChange}
            touched={formik.touched.designation}
            errors={formik.errors.designation}
          />
        </div>
      </div>

      {formik.values.type == 5 ? (
        <>
          <InputsMoney
            wrap
            labels="Performance Base"
            required={true}
            name="performance_base"
            value={formik.values.performance_base}
            onChange={formik.handleChange}
            touched={formik.touched.performance_base}
            errors={formik.errors.performance_base}
          />
          <InputsNumber
            wrap
            labels="New Customers (Monthly KPI)"
            required={true}
            name="monthly_kpi_new_customers"
            value={formik.values.monthly_kpi_new_customers}
            onChange={formik.handleChange}
            touched={formik.touched.monthly_kpi_new_customers}
            errors={formik.errors.monthly_kpi_new_customers}
          />
          <InputsNumber
            wrap
            labels="Renewed Customers (Monthly KPI)"
            required={true}
            name="monthly_kpi_renewed_customers"
            value={formik.values.monthly_kpi_renewed_customers}
            onChange={formik.handleChange}
            touched={formik.touched.monthly_kpi_renewed_customers}
            errors={formik.errors.monthly_kpi_renewed_customers}
          />
          <InputsNumber
            wrap
            labels="Up/Cross Sales (Monthly KPI)"
            required={true}
            name="monthly_kpi_up_cross_sales"
            value={formik.values.monthly_kpi_up_cross_sales}
            onChange={formik.handleChange}
            touched={formik.touched.monthly_kpi_up_cross_sales}
            errors={formik.errors.monthly_kpi_up_cross_sales}
          />
          <InputsMoney
            wrap
            labels="Base Salary"
            name="base_salary"
            value={formik.values.base_salary}
            onChange={formik.handleChange}
            touched={formik.touched.base_salary}
            errors={formik.errors.base_salary}
          />
        </>
      ) : (
        <>
          <Checkboxes
            labels="Allowances"
            wrap
            name="allowance"
            value={formik.values.allowance}
            handleChange={formik.setFieldValue}
            touched={formik.touched.allowance}
            errors={formik.errors.allowance}
            options={[
              { value: 'Lunch', label: 'Lunch' },
              { value: 'Drink', label: 'Drink' },
              { value: 'Parking', label: 'Parking' }
            ]}
          />
          <Dates
            wrap
            labels="Acceptance Date"
            required={true}
            name="acceptance_date"
            defaultValue={formik.values.acceptance_date}
            onChange={(date, dateString) => {
              formik.setFieldValue('acceptance_date', dateString);
            }}
            errors={formik.errors.acceptance_date && formik.touched.acceptance_date && formik.errors.acceptance_date}
          />
          <InputsMoney
            wrap
            labels="Base Salary"
            required={true}
            name="base_salary"
            value={formik.values.base_salary}
            onChange={formik.handleChange}
            touched={formik.touched.base_salary}
            errors={formik.errors.base_salary}
          />
        </>
      )}
      {(formik.values.type == 3 || formik.values.type == 4) && (
        <>
          <InputsMoney
            wrap
            labels="Attendance Allowance"
            required={true}
            name="attendance_allowance"
            value={formik.values.attendance_allowance}
            onChange={formik.handleChange}
            touched={formik.touched.attendance_allowance}
            errors={formik.errors.attendance_allowance}
          />
          <InputsMoney
            wrap
            labels="Housing Allowance"
            required={true}
            name="housing_allowance"
            value={formik.values.housing_allowance}
            onChange={formik.handleChange}
            touched={formik.touched.housing_allowance}
            errors={formik.errors.attendance_allowance}
          />
        </>
      )}
    </div>
  );
}
