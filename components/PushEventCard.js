import { Card, CardBody, CardLink, CardSubtitle, CardText, CardTitle } from 'reactstrap';

const PushEventCard = ({
  created_at,
  payload: {
    commits
  },
  repo: {
    name
  }
}) => {
  const { sha } = commits[0];
  return (
    <Card>
      <CardBody style={{ padding: '0.75rem' }}>
        <CardTitle>Push event</CardTitle>
        <CardSubtitle>{new Date(created_at).toDateString()}</CardSubtitle>
        <CardText>repo: {name}</CardText>
        <CardLink href={`https://github.com/${name}/commit/${sha}`} target='_blank'>
          View in Github
        </CardLink>
      </CardBody>
    </Card>
  );
};

export default PushEventCard;
