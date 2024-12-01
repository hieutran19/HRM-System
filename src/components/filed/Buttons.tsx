import Loading from '../loading/Loading';
import styles from './buttons.module.css';
import { Button } from 'antd';

export default function Buttons(props: any) {
  const { texts, icon, handleClick, classNames, types, status, isLoading = false } = props;
  return (
    <Button
      onClick={handleClick}
      className={`${styles.button} ${
        status == 'success'
          ? styles.success
          : status == 'cancel'
          ? styles.cancel
          : status == 'primary'
          ? styles.primary
          : status == 'danger'
          ? styles.danger
          : ''
      } ${classNames}`}
      htmlType={types}
    >
      {isLoading ? (
        <Loading isOverlay={false} size="small" isLight />
      ) : (
        <>
          {icon && icon} {texts}
        </>
      )}
    </Button>
  );
}
