import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import Tiles from '../../../../components/Titles/Tiles';
import styles from '../detailEmployee.module.css';
import Tables from '../../../../components/Tables/Tables';
import { Link, useParams } from 'react-router-dom';
import Buttons from '../../../../components/filed/Buttons';
import AddContract from './events/AddContract';
import EditContract from './events/EditContract';
import { toast } from 'react-toastify';
import Deletes from '../../../../components/deletes/Deletes';
import { deleteContract, getContractByEmployee } from '../../../../services/apiContract';
import Authorize from '../../../../components/authorize/Authorize';
import { compareText, getUserDepartment, getUserEmployeeId } from '../../../../schemas/utils';

export default function Contract(props: any) {
  const { fetchEmployee, department, pic_id } = props;
  const { id } = useParams();
  const [contract, setContract] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editId, setEditId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const perPage = 5;

  const fetchContract = async () => {
    try {
      const params = {
        page: currentPage,
        perPage: perPage,
        id: id
      };
      const res = await getContractByEmployee(params);
      setContract(res.data);
    } catch (error) {
      toast.error('Contract fetched error');
    }
  };

  useEffect(() => {
    fetchContract();
  }, [currentPage, id]);

  const handleDelete = async () => {
    try {
      await deleteContract(deleteId);
      fetchContract();
      setOpenDelete(false);
      toast.success('Contract deleted successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: 'ID',
      width: '100px',
      selector: (row) => {
        return <Link to={`/contract/${row?.id}`}>{row?.id}</Link>;
      }
    },
    {
      name: 'Position',
      selector: (row) => {
        return row?.position;
      }
    },
    {
      name: 'Type',
      selector: (row) => {
        return row?.type.name;
      }
    },
    {
      name: 'Start date',
      selector: (row) => {
        return row?.start;
      }
    },
    {
      name: 'End date',
      selector: (row) => {
        return row?.end;
      }
    },
    {
      name: 'Status',
      selector: (row) => {
        return row?.status?.name;
      }
    }
    // {
    //   name: 'Action',
    //   width: '100px',
    //   cell: (row) => {
    //     return (
    //       <div className="table-icon-box">
    //         <Authorize allowedPermission="update_contract">
    //           {row?.status == 1 && (
    //             <button className="table-icon" onClick={() => showEdit(row)}>
    //               <EditOutlined />
    //             </button>
    //           )}
    //         </Authorize>
    //         <Authorize allowedPermission="delete_contract">
    //           <button className="table-icon" onClick={() => showDelete(row)}>
    //             <DeleteOutlined />
    //           </button>
    //         </Authorize>
    //       </div>
    //     );
    //   }
    // }
  ];

  return (
    <div className={`${styles.basic}`}>
      <Tiles texts="Contract" fontSize={23} fontWeight={500} customClass={styles.titles} />
      <Authorize
        allowedPermission="create_contract"
        permissionCondition={pic_id == getUserEmployeeId() || compareText(department, getUserDepartment())}
      >
        <Buttons
          texts="Create"
          icon={<PlusOutlined style={{ color: 'white' }} />}
          status="success"
          classNames={styles.createBtn}
          handleClick={() => {
            setOpenAdd(true);
          }}
        />
      </Authorize>
      <Tables columns={columns} datas={contract} setCurrentPage={setCurrentPage} perPage={perPage} />
      <AddContract
        id={id}
        open={openAdd}
        handleCancel={() => setOpenAdd(false)}
        fetchData={() => {
          fetchContract();
          fetchEmployee();
        }}
      />
      {editId && (
        <EditContract
          open={openEdit}
          handleCancel={() => setOpenEdit(false)}
          id={id}
          contractId={editId}
          fetchData={fetchContract}
        />
      )}
      {deleteId && (
        <Deletes
          open={openDelete}
          title="Delete Contract"
          handleOk={handleDelete}
          handleCancel={() => setOpenDelete(false)}
          type="contract"
        />
      )}
    </div>
  );
}
