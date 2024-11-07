import { CSSProperties } from 'react';
import { ClipLoader } from 'react-spinners';

const override: CSSProperties = {
  display: 'flex',
  margin: '120px auto',
  textAlign: 'center',
};

interface LoadingProps {
  loading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  return (
    <div>
      <ClipLoader loading={loading} cssOverride={override} size={150} />
      <p className="flex justify-center text-2xl">잠시 후에 다시 시도하세요.</p>
    </div>
  );
};

export default Loading;
