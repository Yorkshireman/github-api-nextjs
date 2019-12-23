const Results = ({ error, userData }) => {
  if (error) return <p>{error.message}</p>;
  if (userData) {
    const { company, login, name } = userData;
    return (
      <div>
        <h1>{login}</h1>
        <p>{name}</p>
        <p>{company}</p>
      </div>
    );
  }

  return null;
};

export default Results;
