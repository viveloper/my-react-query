import { useCallback, useEffect, useState } from 'react';

const useQuery = (queryFn, params, options) => {
  const [data, setData] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchData = useCallback(() => {
    if (options && options.skip) return;
    setIsFetching(true);
    queryFn(params)
      .then((data) => {
        setData(data);
        setIsSuccess(true);
      })
      .catch(() => {
        setIsError(true);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [queryFn, JSON.stringify(params), JSON.stringify(options)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isFetching,
    isError,
    isSuccess,
    refetch: fetchData,
  };
};

export default useQuery;
