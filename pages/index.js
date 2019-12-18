import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button,
  Form,
  FormGroup,
  Input
} from 'reactstrap';
import React, { useState } from 'react';

import HeadComponent from '../components/Head';

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    name === 'username' ? setUsername(value) : null;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    console.log('call service, username: ', username);
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
      <style jsx>{`
        main {
          padding-top: 1em;
        }
      `}</style>
    </main>
  );
};

export default Index;
