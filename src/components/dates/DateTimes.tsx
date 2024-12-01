import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import styles from './stylesDate.module.css';
import { DATE_TIME_FORMAT } from '../../schemas/types';

export default function DateTimes(props) {
  const { labels, customClass, required, defaultValue, onChange, wrap = false } = props;

  // Default to "00:00" if no time component is provided
  const ensureTimeComponent = (date) => {
    return date.includes(' ') ? date : `${date} 00:00`;
  };

  // Xử lý sự kiện onChange để chuyển đổi ngày và giờ thành định dạng dd-mm-yyyy hh:mm
  const handleChange = (date, dateString) => {
    if (date) {
      const formattedDate = dayjs(date).format(DATE_TIME_FORMAT);
      onChange(date, formattedDate); // Gửi ngày giờ đã định dạng
    } else {
      onChange(null, ''); // Xử lý trường hợp ngày không hợp lệ nếu cần
    }
  };

  // Chuyển đổi defaultValue thành đối tượng dayjs
  const parsedDefaultValue = defaultValue ? dayjs(ensureTimeComponent(defaultValue), DATE_TIME_FORMAT) : null;

  return (
    <div className={`${styles.dates} ${customClass} ${wrap ? styles.wrap : ''}`}>
      {labels && (
        <label htmlFor="label">
          {labels}: {required && <span>*</span>}
        </label>
      )}
      <DatePicker format={DATE_TIME_FORMAT} defaultValue={parsedDefaultValue} showTime onChange={handleChange} />
    </div>
  );
}
