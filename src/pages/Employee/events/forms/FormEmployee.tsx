import Dates from '../../../../components/dates/Dates';
import Inputs from '../../../../components/filed/Inputs';
import SelectAPI from '../../../../components/filed/SelectAPI';
import Selects from '../../../../components/filed/Selects';
import Tiles from '../../../../components/Titles/Tiles';
import { levelOptions, modeOptions } from '../../../../schemas/selectData';
import { getAllCountry } from '../../../../services/apiCountry';
import { getBankList, getHRs, getManagers } from '../../../../services/apiEmployee';
import { Items } from '../../detail/DetailEmployee';
import styles from './formEmployee.module.css';

export default function FormEmployee(props: any) {
  const { formik, employee } = props;
  return (
    <div className={styles.formEmployee}>
      <div className={`${styles.basic} ${styles.information}`}>
        <Tiles texts="Basic Information" fontSize={22} fontWeight={500} customClass={styles.titles} />
        <Inputs
          labels="Name"
          required={true}
          id="name"
          type="text"
          name="name"
          placeholder={'Name'}
          value={formik.values.name}
          onChange={formik.handleChange}
          touched={formik.touched.name}
          errors={formik.errors.name && formik.touched.name && formik.errors.name}
        />
        <Inputs
          labels="Phone"
          required={true}
          id="phone"
          type="text"
          name="phone"
          placeholder={'Phone'}
          value={formik.values.phone}
          onChange={formik.handleChange}
          touched={formik.touched.phone}
          errors={formik.errors.phone && formik.touched.phone && formik.errors.phone}
        />
        <Inputs
          labels="Personal Email"
          required={true}
          id="personal_email"
          type="text"
          name="personal_email"
          placeholder={'Email'}
          value={formik.values.personal_email}
          onChange={formik.handleChange}
          touched={formik.touched.personal_email}
          errors={formik.errors.personal_email && formik.touched.personal_email && formik.errors.personal_email}
        />
        <Inputs
          labels="Work Email"
          required={true}
          id="work_email"
          type="text"
          name="work_email"
          placeholder={'Email'}
          value={formik.values.work_email}
          onChange={formik.handleChange}
          touched={formik.touched.work_email}
          errors={formik.errors.work_email && formik.touched.work_email && formik.errors.work_email}
        />

        <Dates
          labels="Date Of Birth"
          required={true}
          name="DOB"
          defaultValue={formik.values.DOB}
          onChange={(date, dateString) => {
            formik.setFieldValue('DOB', dateString);
          }}
        />
      </div>

      <div className={`${styles.basic} ${styles.information}`}>
        <Tiles texts="Job Information" fontSize={22} fontWeight={500} customClass={styles.titles} />
        <Inputs
          labels="Department"
          required={true}
          id="department"
          type="text"
          name="department"
          placeholder={'Name'}
          value={formik.values.department}
          onChange={formik.handleChange}
          touched={formik.touched.department}
          errors={formik.errors.department && formik.touched.department && formik.errors.department}
        />
        <Inputs
          labels="Position"
          required={true}
          id="position"
          type="text"
          name="position"
          placeholder={'Name'}
          value={formik.values.position}
          onChange={formik.handleChange}
          touched={formik.touched.position}
          errors={formik.errors.position && formik.touched.position && formik.errors.position}
        />
        <Selects
          labels="Level"
          name="level"
          value={formik.values.level}
          required={true}
          options={levelOptions}
          handleChange={(value) => {
            formik.setFieldValue('level', value);
          }}
        />
        <Selects
          labels="Mode"
          name="mode"
          value={formik.values.mode}
          required={true}
          options={modeOptions}
          handleChange={(value) => {
            formik.setFieldValue('mode', value);
          }}
        />
        <SelectAPI
          labels="Report Manager"
          name="report_manager"
          defaultValue={employee?.report_manager}
          value={formik?.values?.report_manager}
          show="employee"
          required={true}
          handleChange={(value) => {
            formik.setFieldValue('report_manager', value);
          }}
          touched={formik.touched.report_manager}
          errors={formik.errors.report_manager}
          optionsAPI={getManagers}
          setDefaultValue={(defaultValue) => formik.setFieldValue('report_manager', defaultValue)}
        />
        <SelectAPI
          labels="HR In Charge"
          name="pic_id"
          defaultValue={employee?.pic}
          value={formik?.values?.pic_id}
          show="employee"
          required={true}
          handleChange={(value) => {
            formik.setFieldValue('pic_id', value);
          }}
          touched={formik.touched.pic_id}
          errors={formik.errors.pic_id}
          optionsAPI={getHRs}
          setDefaultValue={(defaultValue) => formik.setFieldValue('pic_id', defaultValue)}
        />
        <SelectAPI
          labels="Based In"
          name="based_in"
          defaultValue={employee?.based_in}
          value={formik?.values?.based_in}
          show="name"
          required={true}
          handleChange={(value) => {
            formik.setFieldValue('based_in', value);
          }}
          touched={formik.touched.based_in}
          errors={formik.errors.based_in}
          optionsAPI={getAllCountry}
          setDefaultValue={(defaultValue) => formik.setFieldValue('based_in', defaultValue)}
        />

        <Dates
          labels="Joining Date"
          required={true}
          name="joining_date"
          defaultValue={formik.values.joining_date}
          onChange={(date, dateString) => {
            formik.setFieldValue('joining_date', dateString);
          }}
        />
        <Items
          customClass={styles.formLabel}
          label="Probation:"
          text={formik.values.probation ? 'In Progess' : 'Completed'}
        />
        <Items customClass={styles.formLabel} label="Probation Until:" text={formik.values.date_end_prob} />
      </div>

      <div className={`${styles.basic} ${styles.information}`}>
        <Tiles texts="Bank Information" fontSize={22} fontWeight={500} customClass={styles.titles} />
        <SelectAPI
          labels="Bank Name"
          name="bank_name"
          defaultValue={employee?.bank_name}
          value={formik?.values?.bank_name}
          required={true}
          show="bank"
          handleChange={(value) => {
            formik.setFieldValue('bank_name', value);
          }}
          touched={formik.touched.bank_name}
          errors={formik.errors.bank_name}
          optionsAPI={getBankList}
          setDefaultValue={(value) => formik.setFieldValue('bank_name', value)}
        />
        <Inputs
          labels="Bank number"
          required={true}
          type="text"
          name="bank_number"
          placeholder={'Bank Number'}
          value={formik.values.bank_number}
          onChange={formik.handleChange}
          touched={formik.touched.bank_number}
          errors={formik.errors.bank_number}
        />
        <Inputs
          labels="Bank branch"
          required={true}
          type="text"
          name="bank_branch"
          placeholder={'Name'}
          value={formik.values.bank_branch}
          onChange={formik.handleChange}
          touched={formik.touched.bank_branch}
          errors={formik.errors.bank_branch}
        />
        <Inputs
          labels="Bank holder"
          required={true}
          type="text"
          name="holder_name"
          placeholder={'Bank Holder'}
          value={formik.values.holder_name}
          onChange={formik.handleChange}
          touched={formik.touched.holder_name}
          errors={formik.errors.holder_name}
        />
      </div>
    </div>
  );
}
