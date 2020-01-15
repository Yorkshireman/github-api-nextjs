import { RepoCard } from './index';

const Repositories = data => {
  const cards = Object.values(data).map(({
    created_at,
    full_name,
    id,
    name: title,
    updated_at
  }) => {
    const createdDate = new Date(created_at).toDateString();
    const repoUrl = `https://github.com/${full_name}`;
    const updatedDate = new Date(updated_at).toDateString();
    return (
      <div key={id}>
        <RepoCard createdDate={createdDate} repoUrl={repoUrl} title={title} updatedDate={updatedDate} />
        <style jsx>{`
          div {
            margin-top: 0.125em;
          }
        `}</style>
      </div>
    );
  });

  return (
    <section>
      {cards}
    </section>
  );
};

export default Repositories;
