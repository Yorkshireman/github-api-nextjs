import { Spinner } from 'reactstrap';

const LoadingSpinner = () => {
  const spinnerSize = '6rem';
  return (
    <div style={{ margin: '0 auto', width: `${spinnerSize}` }}>
      <Spinner color='primary' style={{ width: `${spinnerSize}`, height: `${spinnerSize}` }} />
    </div>
  );
};

export default LoadingSpinner;
