import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Tables from '../../components/Tables/Tables';
import styles from './employee.module.css';
import Tiles from '../../components/Titles/Tiles';
import { deleteEmployee, getDepartments, getEmployees, getPositons } from '../../services/apiEmployee';
import Deletes from '../../components/deletes/Deletes';
import { toast } from 'react-toastify';
import useLoading from '../../hooks/useLoading';
import MenuBar from '../../components/menuBar/MenuBar';
import Searchs from '../../components/filed/Searchs';
import { formatID, getUserEmployeeId } from '../../schemas/utils';
import Authorize from '../../components/authorize/Authorize';
import Selects from '../../components/filed/Selects';
import { levelOptions, modeOptions } from '../../schemas/selectData';
import SelectAPI from '../../components/filed/SelectAPI';
import { getAllCountry } from '../../services/apiCountry';

export default function Employee() {
  const [employees, setEmployees] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const perPage = 6;
  const [departments, setDepartments] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const currentPage = parseInt(searchParams.get('page') || '1');
  const searchKey = searchParams.get('searchKey') || '';
  const mode = searchParams.get('mode') || '';
  const level = searchParams.get('level') || '';
  const department = searchParams.get('department') || '';
  const status = searchParams.get('status') || '1';
  const based_in = searchParams.get('based_in') || '';
  const based_in_label = searchParams.get('based_in_label') || '';
  const position = searchParams.get('position') || '';
  const position_label = searchParams.get('position_label') || '';

  const menuItem = [
    { key: '1', label: 'Active' },
    { key: '2', label: 'Inactive' }
  ];

  const handleChangeMenu = (key) => {
    setSearchParams({
      status: key
    });
    setSearchValue('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (searchValue) => {
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), searchKey: searchValue, page: '1' });
  };

  const handlePageChange = (page) => {
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: page.toString() });
  };

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        perPage: perPage,
        searchKey: searchKey,
        status: status,
        mode: mode,
        level: level,
        department: department,
        based_in: based_in,
        position: position
      };
      const res = await getEmployees(params);
      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res?.data?.departments);
      console.log(res);
    } catch (error) {
      console.log('load departments error');
    }
  };
  useEffect(() => {
    fetchDepartments();
    if (status == 1) {
      navigate(`/employee?${searchParams}`);
    } else if (status == 2) {
      navigate(`/employee?${searchParams}`);
    }
    fetchEmployees();
  }, [searchParams]);

  const columns = [
    {
      name: 'ID',
      width: '60px',
      selector: (row) => {
        return <Link to={`/employee/${row?.id}`}>{formatID(row.employee_id)}</Link>;
      }
    },
    {
      name: 'Name',
      grow: 3,
      selector: (row) => {
        return row.name;
      }
    },
    {
      name: 'Dept',
      grow: 2,
      selector: (row) => {
        return row?.department;
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
      name: 'Level',
      selector: (row) => {
        return row?.level?.name;
      }
    },
    {
      name: 'Based In',
      selector: (row) => {
        return row?.based_in?.name;
      }
    },
    {
      name: 'University',
      grow: 4,
      selector: (row) => {
        return row?.university?.name;
      }
    },
    {
      name: 'Probation',
      with: '110px',
      selector: (row) => {
        return row?.probation ? 'In Progress' : 'Completed';
      }
    },
    {
      name: 'Action',
      width: '80px',
      cell: (row) => {
        return (
          <div className="table-icon-box">
            <Authorize allowedPermission="update_employee" permissionCondition={row?.pic?.id == getUserEmployeeId()}>
              <Link to={`/employee/update/${row?.id}`} className="table-icon">
                <EditOutlined />
              </Link>
            </Authorize>
            <Authorize allowedPermission="delete_employee">
              <button className="table-icon" onClick={() => showDelete(row)}>
                <DeleteOutlined />
              </button>
            </Authorize>
          </div>
        );
      }
    }
  ];

  const showDelete = (row) => {
    setDeleteId(row?.employee_id);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteEmployee(deleteId);
      fetchEmployees();
      setOpenDelete(false);
      toast.success('Employee deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error('Employee deleted error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.employee}`}>
      <Tiles texts="Employees" fontSize={23} fontWeight={700} />
      <div className="functionBarNotCreate">
        <MenuBar defaultItem={status} items={menuItem} onChange={handleChangeMenu} />
        <div className="functionBarRightNotCreate">
          <Searchs value={searchValue} onChange={handleInputChange} onSearch={handleSearch} />
        </div>
      </div>
      <div className="filterBar">
        <SelectAPI
          wrap
          customerClass={styles.filter}
          value={parseInt(based_in, 10) || 0}
          show="name"
          required={true}
          handleChange={(value, object) => {
            setSearchParams({
              ...Object.fromEntries(searchParams.entries()),
              based_in: value,
              based_in_label: object.label,
              page: '1'
            });
          }}
          optionsAPI={getAllCountry}
          hasAllItem
          allItemLabel="All Countries"
          defaultValue={
            based_in && based_in_label
              ? {
                  id: parseInt(based_in, 10) || 0,
                  name: based_in_label
                }
              : null
          }
        />
        <Selects
          wrap
          customerClass={styles.filter}
          value={department}
          show="only_value"
          options={departments}
          handleChange={(value) =>
            setSearchParams({ ...Object.fromEntries(searchParams.entries()), department: value, page: '1' })
          }
          hasAllItem
          allItemLabel="All Departments"
        />

        <SelectAPI
          wrap
          customerClass={styles.filter}
          value={parseInt(position, 10) || 0}
          show="name"
          required={true}
          handleChange={(value, object) => {
            setSearchParams({
              ...Object.fromEntries(searchParams.entries()),
              position: value,
              position_label: object.label,
              page: '1'
            });
          }}
          optionsAPI={getPositons}
          hasAllItem
          allItemLabel="All Positions"
          defaultValue={
            position && position_label
              ? {
                  id: parseInt(position, 10) || 0,
                  name: position_label
                }
              : null
          }
        />

        <Selects
          wrap
          customerClass={styles.filter}
          value={level}
          options={levelOptions}
          handleChange={(value) =>
            setSearchParams({ ...Object.fromEntries(searchParams.entries()), level: value, page: '1' })
          }
          hasAllItem
          allItemLabel="All Levels"
        />
        <Selects
          wrap
          customerClass={styles.filter}
          value={mode}
          options={modeOptions}
          handleChange={(value) =>
            setSearchParams({ ...Object.fromEntries(searchParams.entries()), mode: value, page: '1' })
          }
          hasAllItem
          allItemLabel="All Modes"
        />
      </div>
      <Tables
        columns={columns}
        datas={employees}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        perPage={perPage}
      />
      {deleteId && (
        <Deletes
          open={openDelete}
          title="Delete Employee"
          handleOk={handleDelete}
          handleCancel={() => setOpenDelete(false)}
          type="employee"
        />
      )}
    </div>
  );
}
