import { Alert } from 'reactstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import RecentActivity from '../components/RecentActivity';
import UserProfile from '../components/UserProfile';

const ResultsContainer = ({ recentActivityData, userData, userDataError, userDataLoading }) => {
  if ((!userData || !recentActivityData) && !userDataError && !userDataLoading) return null;
  if (userDataError) return <Alert color='danger'>{userDataError.message}</Alert>;
  if (userDataLoading) return <LoadingSpinner />;

  const { avatar_url, company, login, name } = userData;

  const filteredRecentActivityData = Object.values(recentActivityData)
    .filter(({ type }) => type === 'PullRequestEvent' || type === 'PushEvent');

  return (
    <div>
      <UserProfile avatar_url={avatar_url} company={company} login={login} name={name} />
      {filteredRecentActivityData.length ?
        <RecentActivity {...filteredRecentActivityData} /> :
        <Alert color='warning'>
          No Recent Pushes or Pull Request events
        </Alert>}
    </div>
  );
};

export default ResultsContainer;
