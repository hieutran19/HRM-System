import { useEffect, useState } from 'react';
import Backs from '../../../components/backs/Backs';
import Tiles from '../../../components/Titles/Tiles';
import styles from './detailEmployee.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteEmployee, getEmployee } from '../../../services/apiEmployee';
import Contract from './contract/Contract';
import Education from './education/Education';
import Buttons from '../../../components/filed/Buttons';
import Deletes from '../../../components/deletes/Deletes';
import { toast } from 'react-toastify';
import useLoading from '../../../hooks/useLoading';
import { formatID, getUserEmployeeId } from '../../../schemas/utils';
import Authorize from '../../../components/authorize/Authorize';
import GeneratePayslip from '../events/GeneratePayslip';

export function Items(props: any) {
  const { text, label, customClass } = props;
  return (
    <div className={`${styles.item} ${customClass}`}>
      <label>{label}</label>
      <span>{text}</span>
    </div>
  );
}

export default function DetailEmployee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [openPayslip, setOpenPayslip] = useState(false);
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const res = await getEmployee(id);
      setEmployee(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteEmployee(id);
      setOpenDelete(false);
      toast.success('Employee deleted successfully');
      navigate('/employee');
    } catch (error) {
      console.log(error);
      toast.error('Employee deleted error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.employee}`}>
      <Backs types="link" ishowIcon={true} texts="Back" />
      <div className={styles.detailEmployee}>
        <Tiles texts={employee?.name} fontSize={23} fontWeight={700} />
        <div className={`${styles.basic} ${styles.information}`}>
          <Tiles texts="Basic Information" fontSize={22} fontWeight={500} customClass={styles.titles} />
          <Items label="Employee ID:" text={formatID(employee?.employee_id)} />
          <Items label="Employee Name:" text={employee?.name} />
          <Items label="Personal Email:" text={employee?.personal_email} />
          <Items label="Work Email:" text={employee?.work_email} />
          <Items label="Phone:" text={employee?.phone} />
          <Items label="Date of Birth:" text={employee?.DOB} />
        </div>

        <div className={`${styles.basic} ${styles.information}`}>
          <Tiles texts="Job Information" fontSize={22} fontWeight={500} customClass={styles.titles} />
          <Items label="Department:" text={employee?.department} />
          <Items label="Position:" text={employee?.position} />
          <Items label="Level:" text={employee?.level?.name} />
          <Items label="Mode:" text={employee?.mode?.name} />
          <Items
            label="Report Manager:"
            text={`${employee?.report_manager?.name} (${employee?.report_manager?.work_email})`}
          />
          <Items label="HR In Charge:" text={`${employee?.pic?.name} (${employee?.pic?.work_email})`} />
          <Items label="Based In:" text={employee?.based_in?.name} />
          <Items label="Joining Date:" text={employee?.joining_date} />
          <Items label="Probation:" text={employee?.probation ? 'In Progess' : 'Completed'} />
          <Items label="Probation Until:" text={employee?.date_end_prob} />
        </div>

        <Education pic_id={employee?.pic?.id} department={employee?.department} />

        <Contract pic_id={employee?.pic?.id} department={employee?.department} fetchEmployee={fetchEmployee} />

        <div className={`${styles.basic} ${styles.information}`}>
          <Tiles texts="PTO" fontSize={22} fontWeight={500} customClass={styles.titles} />
          <Items label="Last Year PTO:" text={employee?.last_year_pto} />
          <Items label="This Year PTO:" text={employee?.this_year_pto} />
          <Items label="PTO Remain:" text={employee?.pto_remain} />
        </div>
        <div className={`${styles.basic} ${styles.information}`}>
          <Tiles texts="Bank" fontSize={22} fontWeight={500} customClass={styles.titles} />
          <Items
            label="Bank Name:"
            text={employee?.bank_name ? `${employee?.bank_name?.abbreviation} (${employee?.bank_name?.name})` : ''}
          />
          <Items label="Bank Number:" text={employee?.bank_number} />
          <Items label="Bank Branch:" text={employee?.bank_branch} />
          <Items label="Bank Holder:" text={employee?.holder_name} />
        </div>
      </div>
      <div className="buttonBox">
        <Authorize allowedPermission="update_employee" permissionCondition={employee?.pic?.id == getUserEmployeeId()}>
          <Buttons
            texts="Update"
            status="success"
            handleClick={() => {
              navigate(`/employee/update/${id}`);
            }}
          />
        </Authorize>
        <Authorize allowedPermission="delete_employee">
          <Buttons texts="Delete" status="danger" handleClick={() => setOpenDelete(true)} />
        </Authorize>
        <Authorize allowedPermission="generate_payslip">
          <Buttons
            texts="Generate Payslip"
            status="primary"
            handleClick={() => {
              setOpenPayslip(true);
            }}
          />
        </Authorize>
        <Buttons texts="Close" status="cancel" handleClick={() => navigate(-1)} />
      </div>

      <GeneratePayslip open={openPayslip} employee_id={employee?.id} handleCancel={() => setOpenPayslip(false)} />

      <Deletes
        open={openDelete}
        title="Delete Employee"
        handleOk={handleDelete}
        handleCancel={() => setOpenDelete(false)}
        type="employee"
      />
    </div>
  );
}
