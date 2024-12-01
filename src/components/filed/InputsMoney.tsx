import CurrencyInput from 'react-currency-input-field';
import styles from './inputsMoney.module.css';

export default function InputsMoney(props: any) {
  const {
    errors,
    value,
    name,
    onChange,
    touched,
    placeholder = 'Please enter a number',
    labels,
    customClass = '',
    required = false,
    disabled = false,
    wrap = false,
    decimalPlaces = 0,
    suffix = ' VNĐ',
    groupSeparator = ','
  } = props;

  const handleChange = (value: string | undefined) => {
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
        <CurrencyInput
          name={name}
          placeholder={placeholder}
          value={value}
          decimalsLimit={decimalPlaces} // Disable decimals for currency input
          groupSeparator={groupSeparator}
          suffix={suffix}
          onValueChange={handleChange}
          disabled={disabled}
          className={styles.currencyInput} // Optional: Add styling class
        />
        {errors && touched && <span className={styles.red}>{errors}</span>}
      </div>
    </div>
  );
}
