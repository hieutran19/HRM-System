import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './backs.module.css';

export default function Backs(props) {
  const { texts, types, ishowIcon } = props; //types có thẻ chuyền vào  link - text - primary - dashed
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Button type={types} block onClick={handleBack} className={styles.backs}>
      {ishowIcon ? <LeftOutlined /> : null} {texts ? texts : null}
    </Button>
  );
}