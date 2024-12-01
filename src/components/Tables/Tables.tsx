import DataTable from 'react-data-table-component';
import Paginations from '../Paginations/Paginations';
import styles from './tables.module.css';

const estilos = {
  headCells: {
    style: {
      backgroundColor: '#278a7c ',
      fontWeight: 'bold',
      fontSize: 14,
      color: '#fff',
      paddingLeft: '8px', // Adjust this value for header padding
      paddingRight: '8px'
    }
  },
  rows: {
    style: {
      backgroundColor: '#fff',
      '& >  div *': {
        whiteSpace: 'normal !important',
        wordBreak: 'keep-all'
      },
      '&:hover': {
        backgroundColor: '#e1e1e1'
      }
    }
  },
  table: {
    style: {
      borderRadius: '10px',
      overflow: 'hidden'
    }
  },
  cells: {
    style: {
      paddingLeft: '8px', // Adjust this value as needed
      paddingRight: '8px' // Adjust this value as needed
    }
  }
};

export default function Tables(props) {
  const {
    datas,
    columns,
    isSelectableRows = false,
    isPersistTableHead = false,
    setSelectedRows,
    setCurrentPage,
    currentPage
  } = props;
  const { per_page, total, employees, employee, contract, contracts_employee, education, university } = datas;

  const handleSelectedRowsChange = (selectedRows) => {
    setSelectedRows && setSelectedRows(selectedRows);
  };

  const noDataComponent = <span style={{ padding: '20px' }}>{'There is no data available.'}</span>;

  return (
    <div className={styles.tables}>
      <DataTable
        persistTableHead={isPersistTableHead}
        noDataComponent={noDataComponent}
        columns={columns}
        data={employees || employee || contracts_employee || education || contract || university}
        selectableRows={isSelectableRows}
        onSelectedRowsChange={handleSelectedRowsChange}
        fixedHeader
        fixedHeaderScrollHeight="100%"
        highlightOnHover
        selectableRowsHighlight
        noHeader
        customStyles={estilos}
      />
      {total > per_page && (
        <div className={styles.pagination}>
          <Paginations
            pageSize={per_page}
            totals={total ?? ''}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
