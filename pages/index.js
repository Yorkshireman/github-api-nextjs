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

const Index = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [username, setUsername] = useState('');

  const handleChange = ({ target: { value } }) => setUsername(value);
  const handleSubmit = async event => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { company, login, name } = await githubApi.searchForUser(username);
      setUserData({ company, login, name });
      setLoading(false);
    } catch(e) {
      setError(e);
      setLoading(false);
    }
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
          <Button color='primary'>Search</Button>
        </Form>
      </section>
      <section>
        { loading ?
          <p>Loading...</p> :
          <Results error={error} userData={userData} />
        }
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
