import { Spinner } from 'reactstrap';

const LoadingSpinner = () => {
  const spinnerSize = '6rem';
  return (
    <div>
      <Spinner color='primary' style={{ width: `${spinnerSize}`, height: `${spinnerSize}` }} />
      <style jsx>{`
        div {
          margin: 0 auto;
          width: ${spinnerSize}
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
