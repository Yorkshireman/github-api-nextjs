import { ListGroup, ListGroupItem } from 'reactstrap';

const Results = ({ userData }) => {
  return userData &&
    <ListGroup>
      <ListGroupItem>Name: {userData.name}</ListGroupItem>
      <ListGroupItem>Company: {userData.company}</ListGroupItem>
    </ListGroup>
  || null;
};

export default Results;
