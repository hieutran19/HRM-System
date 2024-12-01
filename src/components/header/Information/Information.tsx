import useAuth from '../../../hooks/useAuth';
import styles from './information.module.css';
export default function Information() {
  const { logout } = useAuth();
  return (
    <button className={styles.logoutBtn} onClick={logout}>
      Logout
    </button>
  );
}
