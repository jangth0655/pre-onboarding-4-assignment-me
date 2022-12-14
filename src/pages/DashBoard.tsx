import { useQuery } from '@tanstack/react-query';
import { trend } from 'api/apiClient';
import { trendListAtom } from 'atoms/trendAtom';
import DashBoardTitle from 'components/dashBoard/DashBoardTitle';
import TotalStatus from 'components/dashBoard/totalStatus/TotalStatus';
import Layout from 'components/layout/Layout';
import useLoading from 'hooks/useLoading';
import { Report } from 'model/interface';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const DashBoard = () => {
  const isLoading = useLoading();
  const setTrendList = useSetRecoilState(trendListAtom);
  const { data } = useQuery<Report>(['trend'], () => trend, {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (!data?.report.daily) return;
    setTrendList(data?.report.daily);
  }, [data?.report.daily]);

  const totalDataLength = data?.report.daily.length;
  return (
    <Layout>
      <DashBoardTitle dashboard totalDataLength={totalDataLength} />
      {isLoading ? 'loading...' : <TotalStatus />}
    </Layout>
  );
};
export default DashBoard;
