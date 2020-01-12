import { Button } from 'reactstrap';
import RecentActivity from '../components/RecentActivity';
import UserProfile from '../components/UserProfile';

const ResultsContainer = ({ recentActivityData, userData, userDataError, userDataLoading }) => {
  if ((!userData || !recentActivityData) && !userDataError && !userDataLoading) return null;
  if (userDataError) return <p>{userDataError.message}</p>;
  if (userDataLoading) return <p>Loading...</p>;

  const { avatar_url, company, login, name } = userData;

  const filteredRecentActivityData = Object.values(recentActivityData)
    .filter(({ type }) => type === 'PullRequestEvent' || type === 'PushEvent');

  return (
    <div>
      <UserProfile avatar_url={avatar_url} company={company} login={login} name={name} />
      {filteredRecentActivityData.length ?
        <RecentActivity {...filteredRecentActivityData} /> :
        <Button color='warning' style={{ marginBottom: '1rem' }}>
          No Recent Pushes or Pull Request events
        </Button>}
      <style jsx>{`
        div {
          margin-top: 1em;
        }
      `}</style>
    </div>
  );
};

export default ResultsContainer;