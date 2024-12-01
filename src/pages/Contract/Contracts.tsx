import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Tables from '../../components/Tables/Tables';
import styles from './contracts.module.css';
import Tiles from '../../components/Titles/Tiles';
import Deletes from '../../components/deletes/Deletes';
import { toast } from 'react-toastify';
import Buttons from '../../components/filed/Buttons';
import AddContract from '../Employee/detail/contract/events/AddContract';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { deleteContract, getContract } from '../../services/apiContract';
import useLoading from '../../hooks/useLoading';
import Searchs from '../../components/filed/Searchs';
import MenuBar from '../../components/menuBar/MenuBar';
import Authorize, { getUserPermissions } from '../../components/authorize/Authorize';

export default function Contracts() {
  const [contract, setContract] = useState({});
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  // const [openEdit, setOpenEdit] = useState(false);
  // const [editId, setEditId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const perPage = 6;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const [searchValue, setSearchValue] = useState('');
  const searchKey = searchParams.get('searchKey') || '';
  const status = searchParams.get('status') || '1';
  const listPerms = getUserPermissions();

  const menuItem = listPerms.includes('read_contract_all')
    ? [
        { key: '1', label: 'Active' },
        { key: '2', label: 'Inactive' },
        { key: '3', label: 'Draft' }
      ]
    : listPerms.includes('read_contract_draft')
    ? [
        { key: '1', label: 'Active' },
        { key: '3', label: 'Draft' }
      ]
    : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleChangeMenu = (key) => {
    setSearchParams({
      status: key // Thay đổi trạng thái menu
    });
    setSearchValue('');
  };

  const handleSearch = (searchValue) => {
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), searchKey: searchValue, page: '1' });
  };

  const handlePageChange = (page) => {
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: page.toString() });
  };

  const fetchContract = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        perPage: perPage,
        searchKey: searchKey,
        status: status
      };
      const res = await getContract(params);
      setContract(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status == 1) {
      navigate(`/contract?${searchParams}`);
    } else if (status == 2) {
      navigate(`/contract?${searchParams}`);
    }
    fetchContract();
  }, [searchParams]);

  // const showEdit = (row) => {
  //   setEditId(row?.id);
  //   setOpenEdit(true);
  // };

  // const showDelete = (row) => {
  //   setDeleteId(row?.id);
  //   setOpenDelete(true);
  // };

  const handleDelete = async () => {
    try {
      await deleteContract(deleteId);
      fetchContract();
      setOpenDelete(false);
      toast.success('Contract deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error('Contract deleted error');
    }
  };

  const columns = [
    {
      name: 'Employee name',
      grow: 2,
      selector: (row) => {
        return <Link to={`/contract/${row?.id}`}>{row?.employee_name}</Link>;
      }
    },
    {
      name: 'Position',
      grow: 2,
      selector: (row) => {
        return row?.position;
      }
    },
    {
      name: 'Type',
      grow: 2,
      selector: (row) => {
        return row?.type?.name;
      }
    },
    {
      name: 'Start date',
      grow: 2,
      selector: (row) => {
        return row?.start;
      }
    },
    {
      name: 'End date',
      grow: 2,
      selector: (row) => {
        return row?.end;
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
    //             <button
    //               className="table-icon"
    //               onClick={() => {
    //                 showEdit(row);
    //               }}
    //             >
    //               <EditOutlined />
    //             </button>
    //           )}
    //         </Authorize>
    //         <Authorize allowedPermission="delete_contract">
    //           <button
    //             className="table-icon"
    //             onClick={() => {
    //               showDelete(row);
    //             }}
    //           >
    //             <DeleteOutlined />
    //           </button>
    //         </Authorize>
    //       </div>
    //     );
    //   }
    // }
  ];

  return (
    <div className={`${styles.employee}`}>
      <Tiles texts="Contract" fontSize={23} fontWeight={700} />
      {menuItem.length > 0 && (
        <Authorize allowedPermission="read_contract">
          <MenuBar defaultItem={status} items={menuItem} onChange={handleChangeMenu} />
        </Authorize>
      )}

      <div className="functionBar">
        {status == '1' && (
          <Authorize allowedPermission="create_contract">
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
        )}
        <div className="functionBarRight">
          <Searchs value={searchValue} onChange={handleInputChange} onSearch={handleSearch} />
        </div>
      </div>

      <Tables
        columns={columns}
        datas={contract}
        setCurrentPage={handlePageChange}
        currentPage={currentPage}
        perPage={perPage}
      />
      <AddContract
        open={openAdd}
        handleCancel={() => setOpenAdd(false)}
        fetchData={fetchContract}
        isSelectEmployee={true}
        id={null}
      />
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
