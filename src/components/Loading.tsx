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
    <div className="w-screen h-screen bg-gradient-to-r from-gray-900 to-gray-800 pt-10">
      <ClipLoader
        loading={loading}
        cssOverride={override}
        size={125}
        color={'white'}
      />
      <p className="flex justify-center text-2xl text-white">
        영화 정보를 가져오고 있습니다. 잠시만 기다려주세요.
      </p>
    </div>
  );
};

export default Loading;
