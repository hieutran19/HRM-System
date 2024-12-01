import { Pagination } from 'antd';
import styles from './paginations.module.css';

export default function Paginations(props: any) {
  const { totals, pageSize, setCurrentPage, currentPage } = props;

  return (
    <Pagination
      className={styles.pagination}
      pageSize={pageSize}
      total={totals}
      current={currentPage}
      showQuickJumper
      showTotal={(total) => `Total ${total} items`}
      onChange={(page) => setCurrentPage(page)}
      align="center"
      size="small"
      showSizeChanger={false}
    />
  );
}
