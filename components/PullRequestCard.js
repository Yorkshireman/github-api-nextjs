import { CardBody, CardLink, CardSubtitle, CardText, CardTitle, Card } from 'reactstrap';

const PullRequestCard = ({
  created_at,
  payload: {
    action,
    pull_request: {
      html_url: href
    }
  },
  repo: {
    name
  }
}) => {
  return (
    <Card>
      <CardBody style={{ padding: '0.75rem' }}>
        <CardTitle>Pull Request event: {action}</CardTitle>
        <CardSubtitle>{new Date(created_at).toDateString()}</CardSubtitle>
        <CardText>repo: {name}</CardText>
        <CardLink href={href} target='_blank'>View in Github</CardLink>
      </CardBody>
    </Card>
  );
};

export default PullRequestCard;
