import { Link, useNavigate, useParams } from 'react-router-dom';
import Backs from '../../../components/backs/Backs';
import Tiles from '../../../components/Titles/Tiles';
import styles from './contractDetail.module.css';
import { useEffect, useState } from 'react';
import { concatImage, formatMoney } from '../../../schemas/utils';
import { deleteContract, getContractDetail } from '../../../services/apiContract';
import Buttons from '../../../components/filed/Buttons';
import Deletes from '../../../components/deletes/Deletes';
import { toast } from 'react-toastify';
import Loading from '../../../components/loading/Loading';
import useLoading from '../../../hooks/useLoading';
import Authorize from '../../../components/authorize/Authorize';

function Items(props: any) {
  const { text, label, links, isNewTab, isLoading = false } = props;

  return (
    <div className={styles.item}>
      <label>{label}</label>
      {isLoading ? (
        <span>
          <Loading isOverlay={false} size="small" />
        </span>
      ) : (
        <>
          {links ? (
            <Link to={links} target={isNewTab ? '_blank' : '_self'} rel={isNewTab ? 'noopener noreferrer' : undefined}>
              {text}
            </Link>
          ) : (
            <span>{text}</span>
          )}
        </>
      )}
    </div>
  );
}

export function ContractDetail() {
  const { id } = useParams();
  const [contract, setContract] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCenter, setIsLoadingCenter] = useState(false);
  const navigate = useNavigate();

  const fetchContract = async () => {
    setIsLoadingCenter(true);
    try {
      const res = await getContractDetail(id);
      setContract(res?.data);
      if (res?.data?.attachment) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingCenter(false);
    }
  };

  const checkContract = async () => {
    const interval = setInterval(async () => {
      try {
        const res = await getContractDetail(id);
        if (res?.data?.attachment) {
          setContract(res?.data);
          setIsLoading(false);
          clearInterval(interval);
        } else {
          setIsLoading(true);
        }
      } catch (error) {
        console.log(error);
        clearInterval(interval); // Stop checking on error
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  };

  useEffect(() => {
    fetchContract();
    checkContract();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteContract(id);
      toast.success('Contract deleted successfully');
      navigate('/contract');
    } catch (error) {
      console.log(error);
      toast.error('Contract deleted error');
    }
  };

  return (
    <>
      {isLoadingCenter ? (
        <Loading />
      ) : (
        <div className={`${styles.contract}`}>
          <Backs types="link" ishowIcon={true} texts="Back" />
          <div className={styles.detailEmployee}>
            <Tiles
              texts={`${contract?.type?.name} - ${contract?.employee_name} Contract`}
              fontSize={23}
              fontWeight={700}
            />
          </div>
          <div className={`${styles.basic} ${styles.information}`}>
            <Tiles texts="Employee Information" fontSize={22} fontWeight={500} customClass={styles.titles} />
            <Items label="Employee Name:" text={contract?.employee_name} />
            <Items label="Personal email:" text={contract?.employee_personal_email} />
            <Items label="Work Email:" text={contract?.employee_work_email} />
          </div>
          <div className={`${styles.basic} ${styles.information}`}>
            <Tiles texts="Contract Information" fontSize={22} fontWeight={500} customClass={styles.titles} />
            <Items label="Position:" text={contract?.position} />
            <Items label="Type" text={contract?.type?.name} />
            <Items label="Start date:" text={contract?.start} />
            <Items label="End date:" text={contract?.type?.id == 4 ? 'Indefinite' : contract?.end} />
            <Items label="Direct manager:" text={`${contract?.director_manager}. ${contract?.director_name}`} />
            <Items label="Manager designation:" text={contract?.designation} />
            <Items label="Acceptance date:" text={contract?.acceptance_date} />
            <Items label="Status:" text={contract?.status?.name} />
            <Items
              label="Contract attachment:"
              text={`${contract?.position}_${contract?.employee_name}_${contract?.start}_${contract?.end}.pdf`
                ?.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/\s+/g, '_')}
              links={concatImage(contract?.attachment)}
              isNewTab={true}
              isLoading={isLoading}
            />
          </div>
          <div className={`${styles.basic} ${styles.information}`}>
            <Tiles texts="Benefit" fontSize={22} fontWeight={500} customClass={styles.titles} />
            <Items label="Base salary:" text={formatMoney(contract?.base_salary)} />

            {contract?.attendance_allowance > 0 && (
              <Items label="Attendance Allowance:" text={formatMoney(contract?.attendance_allowance)} />
            )}
            {contract?.lunch_allowance_amount > 0 && (
              <Items label=" Lunch Allowance:" text={formatMoney(contract?.lunch_allowance_amount)} />
            )}
            {contract?.drink_allowance_amount > 0 && (
              <Items label=" Drink Allowance:" text={formatMoney(contract?.drink_allowance_amount)} />
            )}
            {contract?.parking_allowance_amount > 0 && (
              <Items label=" Parking Allowance:" text={formatMoney(contract?.parking_allowance_amount)} />
            )}
            {contract?.housing_allowance > 0 && (
              <Items label="Housing Allowance:" text={formatMoney(contract?.housing_allowance)} />
            )}
          </div>

          <div className="buttonBox">
            <Buttons
              texts="View PDF File"
              status="primary"
              handleClick={() => window.open(concatImage(contract?.attachment), '_blank')}
              isLoading={isLoading}
            />
            <Authorize allowedPermission="delete_contract">
              <Buttons texts="Delete" status="danger" handleClick={() => setOpenDelete(true)} />
            </Authorize>
            <Buttons texts="Close" status="cancel" handleClick={() => navigate(-1)} />
          </div>
          <Deletes
            open={openDelete}
            title="Delete Contract"
            handleOk={handleDelete}
            handleCancel={() => setOpenDelete(false)}
            type="contract"
          />
        </div>
      )}
    </>
  );
}
