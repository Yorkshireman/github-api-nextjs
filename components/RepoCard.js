import { Card, CardBody, CardLink, CardSubtitle, CardText, CardTitle } from 'reactstrap';

const RepoCard = ({
  createdDate,
  repoUrl,
  title,
  updatedDate
}) => {
  return (
    <Card>
      <CardBody style={{ padding: '0.75rem' }}>
        <CardTitle><strong>{title}</strong></CardTitle>
        <CardSubtitle>last updated {updatedDate}</CardSubtitle>
        <CardText>created {createdDate}</CardText>
        <CardLink href={repoUrl} target='_blank'>
          View in Github
        </CardLink>
      </CardBody>
    </Card>
  );
};

export default RepoCard;
