import { Link, useLocation } from 'react-router-dom';
import styles from './menus.module.css';

export default function Menus() {
  const location = useLocation();
  return (
    <div className={`${styles.menus}`}>
      <ul>
        <li className={`${styles.menuItem} ${location.pathname.includes('/employee') ? styles.active : ''}`}>
          <Link to="/employee">Employee</Link>
        </li>
        <li className={`${styles.menuItem} ${location.pathname.includes('/contract') ? styles.active : ''}`}>
          <Link to="/contract">Contract</Link>
        </li>
        <li className={`${styles.menuItem} ${location.pathname.includes('/event') ? styles.active : ''}`}>
          <Link to="/event">Event</Link>
        </li>
        <li className={`${styles.menuItem} ${location.pathname.includes('/university') ? styles.active : ''}`}>
          <Link to="/university">University</Link>
        </li>
      </ul>
    </div>
  );
}
