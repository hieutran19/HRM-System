import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import styles from './stylesDate.module.css';
import { DATE_FORMAT, MONTH_FORMAT } from '../../schemas/types';

export default function Dates(props: any) {
  const {
    defaultValue,
    onChange,
    labels,
    errors,
    customClass,
    required,
    wrap = false,
    show = 'date' // Default view is 'date'
  } = props;

  // Determine the format based on the 'show' prop
  const format = show === 'month' ? MONTH_FORMAT : DATE_FORMAT;

  // State to manage the date value
  const [value, setValue] = useState(defaultValue ? dayjs(defaultValue, format) : null);

  // Update the local state when the defaultValue prop changes
  useEffect(() => {
    setValue(defaultValue ? dayjs(defaultValue, format) : null);
  }, [defaultValue, format]);

  // Handle onChange to convert date to the specified format
  const handleChange = (date, dateString) => {
    if (date) {
      const formattedDate = dayjs(date).format(format);
      setValue(date); // Update local state
      onChange(date, formattedDate); // Send formatted date
    } else {
      setValue(null); // Handle invalid date if needed
      onChange(null, ''); // Handle invalid date if needed
    }
  };

  return (
    <div className={`${styles.dates} ${customClass} ${wrap ? styles.wrap : ''}`}>
      {labels && (
        <label htmlFor="label">
          {labels}: {required && <span>*</span>}
        </label>
      )}
      <DatePicker
        picker={show === 'month' ? 'month' : undefined}
        format={format}
        value={value}
        onChange={handleChange}
      />
      {errors && <span className={styles.red}>{errors}</span>}
    </div>
  );
}
