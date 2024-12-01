import { Select } from 'antd';
import styles from './selects.module.css';
import { useState } from 'react';
import useDebounce from '../../hooks/useDebounces';

export default function Selects(props: any) {
  const {
    labels,
    id,
    required,
    customerClass,
    options,
    name,
    handleChange,
    errors,
    wrap = false,
    value,
    show = 'value',
    mode = '',
    hasAllItem = false,
    allItemLabel = ''
  } = props;

  const [searchValue, setSearchValue] = useState('');

  const debouncedSearchValue = useDebounce(searchValue);

  const formatOption = (option: any) => {
    if (show === 'name') {
      return { label: option?.name, value: option?.id };
    } else if (show === 'employee') {
      return { label: `${option?.name} (${option?.work_email})`, value: option?.id };
    } else if (show === 'bank') {
      return { label: `${option?.abbreviation} - ${option?.name}`, value: option?.abbreviation };
    } else if (show === 'only_value') {
      return { label: `${option}`, value: `${option}` };
    }
    return option;
  };

  const handleSearch = (searchKey) => {
    setSearchValue(searchKey);
  };

  return (
    <div className={`${styles.selects} ${customerClass} ${wrap ? styles.wrap : ''}`}>
      {labels && (
        <label htmlFor={id}>
          {labels}: {required && <span className={styles.red}>*</span>}
        </label>
      )}
      <div className={styles.select}>
        <Select
          value={value || (options?.length <= 0 ? undefined : hasAllItem ? '' : formatOption(options[0]))}
          fieldNames={name}
          onChange={handleChange}
          options={
            hasAllItem
              ? [{ value: '', label: allItemLabel }, ...options.map((option) => formatOption(option))]
              : options.map((option) => formatOption(option))
          }
          showSearch
          onSearch={handleSearch}
          filterOption={(input, option) => option?.label.toLowerCase().includes(debouncedSearchValue.toLowerCase())}
          virtual
          optionFilterProp="label"
        />
        {errors && <span className={styles.red}>{errors}</span>}
      </div>
    </div>
  );
}
