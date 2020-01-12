import { useState } from 'react';

import { Button, Collapse } from 'reactstrap';
import PushEventCard from './PushEventCard';
import PullRequestCard from './PullRequestCard';

const RecentActivity = data => {
  const [collapse, setCollapse] = useState(false);
  const toggle = () => setCollapse(!collapse);

  const cards = Object.values(data).map(event => {
    let card;
    switch (event.type) {
    case 'PullRequestEvent':
      card = <PullRequestCard {...event} />;
      break;
    case 'PushEvent':
      card = <PushEventCard {...event} />;
    }

    return (
      <div key={event.id} style={{ marginBottom: '0.125em' }}>
        {card}
      </div>
    );
  });

  return (
    <section>
      <Button color='primary' onClick={toggle}>
        Open Recent Activity
      </Button>
      <p>(push events and pull request events only)</p>
      <Collapse isOpen={collapse}>
        {cards}
      </Collapse>
      <style jsx>{`
        p {
          font-size: 0.85em;
          margin-bottom: 0.5em;
          margin-top: 0.5em;
        }
      `}</style>
    </section>
  );
};

export default RecentActivity;
