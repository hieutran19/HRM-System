import Dates from '../../../../../components/dates/Dates';
import Inputs from '../../../../../components/filed/Inputs';
import Selects from '../../../../../components/filed/Selects';
import styles from './formEducation.module.css';
import SelectAPI from '../../../../../components/filed/SelectAPI';
import { getUniversity } from '../../../../../services/apiUniversity';

export default function FormEducation(props: any) {
  const { formik, education, degrees } = props;

  return (
    <div className={styles.formEducation}>
      <SelectAPI
        wrap
        labels="University"
        name="university_id"
        defaultValue={education?.university}
        value={formik.values.university_id}
        required={true}
        show="name"
        handleChange={(value) => {
          formik.setFieldValue('university_id', value);
        }}
        optionsAPI={getUniversity}
        setDefaultValue={(defaultValue) => formik.setFieldValue('university_id', defaultValue)}
      />

      <Inputs
        wrap
        labels="Major"
        required={true}
        type="text"
        name="major"
        placeholder={'Major'}
        value={formik.values.major}
        onChange={formik.handleChange}
        touched={formik.touched.major}
        errors={formik.errors.major && formik.touched.major && formik.errors.major}
      />

      <Dates
        wrap
        show="month"
        labels="Start Date"
        required={true}
        name="start_date"
        defaultValue={formik.values.start_date}
        onChange={(date, dateString) => {
          formik.setFieldValue('start_date', dateString);
        }}
        errors={formik.errors.start_date && formik.touched.start_date && formik.errors.start_date}
      />

      <Dates
        wrap
        show="month"
        labels="End Date"
        required={true}
        name="end_date"
        defaultValue={formik.values.end_date}
        onChange={(date, dateString) => {
          formik.setFieldValue('end_date', dateString);
        }}
        errors={formik.errors.end_date}
      />

      <Selects
        wrap
        labels="Degree Type"
        name="degree_type"
        value={formik.values.degree_type}
        required={true}
        options={degrees}
        show="name"
        handleChange={(value) => {
          formik.setFieldValue('degree_type', value);
        }}
        touched={formik.touched.degree_type}
        errors={formik.errors.degree_type}
      />

      <Inputs
        wrap
        labels="GPA"
        name="gpa"
        type="text"
        placeholder={'GPA'}
        value={formik.values.gpa}
        onChange={formik.handleChange}
        touched={formik.touched.gpa}
        errors={formik.errors.gpa}
      />
      {/* <Selects
        wrap
        labels="Degree"
        name="degree"
        value={formik.values.degree_type}
        required={true}
        options={degreeOptions}
        handleChange={(value) => {
          formik.setFieldValue('degree', value);
        }}
      /> */}
    </div>
  );
}
