import { Checkbox } from 'antd';
import styles from './inputs.module.css';

export default function Checkboxes(props) {
  const { labels, required, customerClass, options, name, handleChange, value, touched, errors, wrap = false } = props;

  const onCheckboxChange = (checkedValues) => {
    handleChange(name, checkedValues);
  };

  return (
    <div className={`${styles.inputs} ${customerClass} ${wrap ? styles.wrap : ''}`}>
      {labels && (
        <label>
          {labels}: {required && <span className={styles.red}>*</span>}
        </label>
      )}
      <Checkbox.Group
        style={{ width: '100%', justifyContent: 'space-between' }}
        onChange={onCheckboxChange}
        options={options}
        value={value}
      />
      {touched && errors && <div className={styles.red}>{errors}</div>}
    </div>
  );
}
