import classnames from 'classnames';
import { useState } from 'react';

import { Alert, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { LoadingSpinner, RecentActivity, Repositories, UserProfile } from './index';

const Results = ({ recentActivityData, reposData, userData, userDataError, userDataLoading }) => {
  if ((!userData || !recentActivityData || !reposData) && !userDataError && !userDataLoading) return null;
  if (userDataError) return <Alert color='danger'>{userDataError.message}</Alert>;
  if (userDataLoading) return <LoadingSpinner />;

  const [activeTab, setActiveTab] = useState('1');
  const { avatar_url, company, login, name } = userData;

  const filteredRecentActivityData = Object.values(recentActivityData)
    .filter(({ type }) => type === 'PullRequestEvent' || type === 'PushEvent');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <UserProfile avatar_url={avatar_url} company={company} login={login} name={name} />
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Public Repos
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Recent Activity
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId='1'>
          {Object.values(reposData).length ?
            <Repositories {...reposData} /> :
            <p>No Public Repositories</p>}
        </TabPane>
        <TabPane tabId='2'>
          {filteredRecentActivityData.length ?
            <RecentActivity {...filteredRecentActivityData} /> :
            <p>No recent Pushes or Pull Request events</p>}
        </TabPane>
        <style jsx>{`
          p {
            margin-top: 1em;
          }
        `}</style>
      </TabContent>
    </div>
  );
};

export default Results;
