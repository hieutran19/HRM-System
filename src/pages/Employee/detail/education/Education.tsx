import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import Tiles from '../../../../components/Titles/Tiles';
import styles from '../detailEmployee.module.css';
import Tables from '../../../../components/Tables/Tables';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import Buttons from '../../../../components/filed/Buttons';
import EditEducation from './events/EditEducation';
import { toast } from 'react-toastify';
import Deletes from '../../../../components/deletes/Deletes';
import { deleteEducation, getEducationByEmployee } from '../../../../services/apiEducation';
import AddEducation from './events/AddEducation';
import useLoading from '../../../../hooks/useLoading';
import Authorize from '../../../../components/authorize/Authorize';
import { compareText, getUserDepartment, getUserEmployeeId } from '../../../../schemas/utils';

export default function Education(props: any) {
  const { id } = useParams();
  const { department, pic_id } = props;

  const [contract, setEducation] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editId, setEditId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const perPage = 5;
  const { setLoading } = useLoading();

  const fetchEducation = async () => {
    setLoading(true);
    const params = {
      page: currentPage,
      perPage: perPage,
      id: id
    };
    try {
      const res = await getEducationByEmployee(params);
      setEducation(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, [currentPage, id]);

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
      await deleteEducation(deleteId);
      fetchEducation();
      setOpenDelete(false);
      toast.success('Education deleted successfully');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: 'University',
      selector: (row) => {
        return <Link to={`/university/${row?.university?.id}`}>{row?.university?.original_name}</Link>;
      }
    },
    {
      name: 'Major',
      selector: (row) => {
        return row?.major;
      }
    },

    {
      name: 'Start date',
      selector: (row) => {
        return row?.start_date;
      }
    },
    {
      name: 'End date',
      selector: (row) => {
        return row?.end_date;
      }
    },
    {
      name: 'Degree Type',
      selector: (row) => {
        return row?.employee_degree?.name;
      }
    },
    {
      name: 'GPA',
      selector: (row) => {
        return row?.gpa;
      }
    },

    {
      name: 'Action',
      width: '100px',
      cell: (row) => {
        return (
          <div className="table-icon-box">
            <button className="table-icon" onClick={() => showEdit(row)}>
              <EditOutlined />
            </button>
            <Authorize allowedPermission="delete_education">
              <button className="table-icon" onClick={() => showDelete(row)}>
                <DeleteOutlined />
              </button>
            </Authorize>
          </div>
        );
      }
    }
  ];

  return (
    <div className={`${styles.basic}`}>
      <Tiles texts="Education" fontSize={22} fontWeight={500} customClass={styles.titles} />
      <Authorize
        allowedPermission="create_education"
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
      <AddEducation open={openAdd} handleCancel={() => setOpenAdd(false)} fetchData={fetchEducation} />
      {editId && (
        <EditEducation open={openEdit} handleCancel={() => setOpenEdit(false)} id={editId} fetchData={fetchEducation} />
      )}
      {deleteId && (
        <Deletes
          open={openDelete}
          title="Delete Education"
          handleOk={handleDelete}
          handleCancel={() => setOpenDelete(false)}
          type="education"
        />
      )}
    </div>
  );
}
