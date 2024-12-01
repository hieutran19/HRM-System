import { Header } from 'antd/es/layout/layout';
import styles from './headers.module.css';
import Information from './Information/Information';
import Menus from './Menus/Menus';
import Logos from './Logo/Logo';

export default function Headers() {
  return (
    <Header className={`${styles.headers}`}>
      <Logos />
      <Menus />
      <Information />
    </Header>
  );
}
