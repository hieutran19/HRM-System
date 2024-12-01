import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Tables from '../../components/Tables/Tables';
import styles from './university.module.css';
import Tiles from '../../components/Titles/Tiles';
import Deletes from '../../components/deletes/Deletes';
import { toast } from 'react-toastify';
import { deleteUniversity, getUniversity } from '../../services/apiUniversity';
import Buttons from '../../components/filed/Buttons';
import useLoading from '../../hooks/useLoading';
import AddUniversity from './events/AddUniversity';
import EditUniversity from './events/EditUniversity';
import Authorize from '../../components/authorize/Authorize';
import Searchs from '../../components/filed/Searchs';

export default function University() {
  const { id } = useParams();
  const [university, setUniversity] = useState({});
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editId, setEditId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const perPage = 6;
  const { setLoading } = useLoading();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const currentPage = parseInt(searchParams.get('page') || '1');
  const searchKey = searchParams.get('searchKey') || '';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (searchValue) => {
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), searchKey: searchValue, page: '1' });
  };

  const handlePageChange = (page) => {
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: page.toString() });
  };

  const fetchUniversity = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        perPage: perPage,
        searchKey: searchKey
      };
      const res = await getUniversity(params);
      setUniversity(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUniversity();
  }, [currentPage, searchKey]);

  const showEdit = (row) => {
    setEditId(row?.id);
    setOpenEdit(true);
  };

  const showDelete = (row) => {
    setDeleteId(row?.id);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUniversity(deleteId);
      fetchUniversity();
      setOpenDelete(false);
      toast.success('University deleted successfully');
    } catch (error) {
      console.log(error);
      toast.success('University deleted successfully');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: 'Name',
      selector: (row) => {
        return <Link to={`/university/${row?.id}`}>{row.name}</Link>;
      }
    },
    {
      name: 'English Name',
      grow: 3,
      selector: (row) => {
        return row?.english_name;
      }
    },
    {
      name: 'Original Name',
      grow: 3,
      selector: (row) => {
        return row?.original_name;
      }
    },
    {
      name: 'Country',
      selector: (row) => {
        return row?.country?.short_name;
      }
    },
    {
      name: 'Location',
      grow: 3,
      selector: (row) => {
        return row?.location;
      }
    }
  ];

  return (
    <div className={`${styles.university}`}>
      <Tiles texts="University" fontSize={23} fontWeight={700} />
      <div className="functionBar">
        <Authorize allowedPermission="create_university">
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
        <div className="functionBarRight">
          <Searchs value={searchValue} onChange={handleInputChange} onSearch={handleSearch} />
        </div>
      </div>
      <Tables
        columns={columns}
        datas={university}
        setCurrentPage={handlePageChange}
        perPage={perPage}
        currentPage={currentPage}
      />
      <AddUniversity
        open={openAdd}
        handleCancel={() => setOpenAdd(false)}
        fetchData={fetchUniversity}
        isSelectEmployee={true}
      />
      {editId && (
        <EditUniversity
          open={openEdit}
          handleCancel={() => setOpenEdit(false)}
          id={editId}
          fetchData={fetchUniversity}
        />
      )}
      {deleteId && (
        <Deletes
          open={openDelete}
          title="Delete University"
          handleOk={handleDelete}
          handleCancel={() => setOpenDelete(false)}
          type="university"
        />
      )}
    </div>
  );
}
