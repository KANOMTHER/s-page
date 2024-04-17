import { useParams } from 'react-router-dom';

const Dynamic = () => {
  const { foo, bar } = useParams();
  return (
    <>
      <div>Test</div>
      <div>foo: {foo}</div>
      <div>bar: {bar ? bar : 'no value for bar'}</div>
    </>
  );
};

export default Dynamic;
