import { InputNumber } from 'antd';
import styles from './inputs.module.css';

export default function InputsNumber(props: any) {
  const {
    errors,
    value,
    name,
    onChange,
    touched,
    placeholder,
    labels,
    customClass = '',
    required = false,
    disabled = false,
    wrap = false,
    step = 1,
    min = 0,
    max,
    decimalPlaces = 0 // Optional: specify number of decimal places if needed
  } = props;

  const handleChange = (value) => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: value !== undefined ? value : '' // Set empty if value is undefined
        }
      });
    }
  };

  return (
    <div className={`${styles.inputs} ${customClass} ${wrap ? styles.wrap : ''}`}>
      {labels && (
        <label htmlFor={name}>
          {labels}: {required && <span className={styles.red}>*</span>}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <InputNumber
          value={value}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          precision={decimalPlaces} // Set decimal precision if needed
          min={min} // Optional: Minimum value set to 0
          status={touched && errors ? 'error' : undefined}
          style={{ width: '100%' }} // Ensure it takes full width
          step={step}
          max={max}
        />
        {errors && <span className={styles.red}>{errors}</span>}
      </div>
    </div>
  );
}
