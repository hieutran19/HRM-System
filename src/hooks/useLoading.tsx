import { useContext } from 'react';
import LoadingContext from '../context/LoadingProvider';

const useLoading = () => {
  const { loading } = useContext(LoadingContext);
  return useContext(LoadingContext);
};

export default useLoading;
