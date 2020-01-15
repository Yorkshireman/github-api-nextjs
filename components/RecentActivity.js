import { PushEventCard, PullRequestCard } from './index';

const RecentActivity = data => {
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
      <div key={event.id}>
        {card}
        <style jsx>{`
          div {
            margin-bottom: 0.125em;
          }
        `}</style>
      </div>
    );
  });

  return (
    <section>
      <p>(push events and pull request events only)</p>
      {cards}
      <style jsx>{`
        p {
          font-size: 0.85em;
          margin: 0.5em 0 0.6em 0;
          text-align: center;
        }
      `}</style>
    </section>
  );
};

export default RecentActivity;
