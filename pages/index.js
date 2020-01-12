import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

import {
  Button,
  Form,
  FormGroup,
  Input
} from 'reactstrap';

import { githubApi } from '../services/githubApi';
import HeadComponent from '../components/Head';
import ResultsContainer from '../containers/ResultsContainer';

const Index = () => {
  const [recentActivityData, setRecentActivity] = useState();
  const [userData, setUserData] = useState();
  const [userDataError, setUserDataError] = useState();
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [username, setUsername] = useState('');

  const fetchUserData = async () => {
    const userData = await githubApi.searchForUser(username);
    setUserData({ ...userData });
    const recentActivityData = await githubApi.searchForRecentActivity(userData.login);
    setRecentActivity({ ...recentActivityData });
  };

  const handleChange = ({ target: { value } }) => setUsername(value);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setUserDataError(null);
      setUserDataLoading(true);
      await fetchUserData();
      setUserDataLoading(false);
      setUsername('');
    } catch (e) {
      setUserDataError(e);
      setUserDataLoading(false);
    }
  };

  const resultsProps = { recentActivityData, userData, userDataError, userDataLoading };

  return (
    <main className='container'>
      <HeadComponent />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            id='username'
            name='username'
            onChange={handleChange}
            placeholder='Github username'
            type='text'
            value={username}
          />
        </FormGroup>
        <Button color='primary'>Search</Button>
      </Form>
      <ResultsContainer {...resultsProps} />
      <style jsx>{`
        main {
          margin-top: 1em;
        }
      `}</style>
    </main>
  );
};

export default Index;
