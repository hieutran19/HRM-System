import styles from './searchs.module.css';
import { Input } from 'antd';
const { Search } = Input;

export default function Searchs(props: any) {
  const { onSearch, value, onChange } = props;
  return (
    <Search
      className={styles.searchs}
      allowClear
      placeholder="Search"
      onSearch={onSearch}
      enterButton
      value={value}
      onChange={onChange}
    />
  );
}
