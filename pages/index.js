import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button,
  Form,
  FormGroup,
  Input
} from 'reactstrap';
import React, { useState } from 'react';

import { githubApi } from '../services/githubApi';
import HeadComponent from '../components/Head';
import Results from '../components/Results';

const parseUserData = ({ company, name }) => {
  return {
    company,
    name
  };
};

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [username, setUsername] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    name === 'username' ? setUsername(value) : null;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    const response = await githubApi.searchForUser(username);
    setUserData(parseUserData(response));
    setLoading(false);
  };

  return (
    <main className='container'>
      <HeadComponent />
      <section>
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
          { loading ?
            <p>Loading...</p> :
            <Button color='primary'>Search</Button>
          }
        </Form>
      </section>
      <section>
        <Results userData={userData} />
      </section>
      <style jsx>{`
        main {
          margin-top: 1em;
        }

        section:nth-child(2) {
          margin-top: 1em;
        }
      `}</style>
    </main>
  );
};

export default Index;
