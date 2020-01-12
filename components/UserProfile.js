import { Col, Row } from 'reactstrap';

const UserProfile = ({ avatar_url, company, login, name }) => {
  return (
    <section id='user-profile'>
      <Row>
        <Col xs='4'>
          <img src={avatar_url} />
        </Col>
        <Col xs='6'>
          <h3>{login}</h3>
          <p>{name}</p>
          <p>{company}</p>
        </Col>
      </Row>
      <style jsx>{`
        img {
          max-width: 100px;
        }

        p {
          margin-bottom: 0;
        }

        #user-profile {
          margin-bottom: 1em;
        }
      `}</style>
    </section>
  );
};

export default UserProfile;
