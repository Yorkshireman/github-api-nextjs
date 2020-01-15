import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

import {
  Button,
  Form,
  FormGroup,
  Input
} from 'reactstrap';

import { githubApi } from '../services/githubApi';
import { HeadComponent, Results } from '../components';

const Index = () => {
  const [recentActivityData, setRecentActivity] = useState();
  const [reposData, setReposData] = useState();
  const [userData, setUserData] = useState();
  const [userDataError, setUserDataError] = useState();
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [username, setUsername] = useState('');

  const fetchUserData = async () => {
    const userData = await githubApi.searchForUser(username);
    setUserData({ ...userData });

    const [recentActivityData, reposData] = await Promise.all([
      githubApi.fetchRecentActivity(userData.login),
      githubApi.fetchUserRepos(username)
    ]);

    setRecentActivity({ ...recentActivityData });
    setReposData({ ...reposData });
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

  const resultsProps = { recentActivityData, reposData, userData, userDataError, userDataLoading };

  return (
    <main className='container'>
      <HeadComponent />
      <section id='search-form'>
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
      </section>
      <Results {...resultsProps} />
      <style jsx>{`
        #search-form {
          margin-bottom: 1em;
        }

        main {
          max-width: 380px;
          margin-top: 1em;
        }
      `}</style>
    </main>
  );
};

export default Index;
