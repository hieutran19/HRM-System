import { Link } from 'react-router-dom';
import styles from './links.module.css';

export default function Links(props: any) {
  const { to, texts, icon, classNames } = props;
  return (
    <Link to={to} className={`${styles.links} ${classNames}`}>
      {icon && icon} {texts}
    </Link>
  );
}
