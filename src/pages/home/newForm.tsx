import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import styles from './index.less';

interface Props {
  value: string;
  onValueChange: (value: string) => void;
}

const MyForm: React.FC<Props> = ({ value, onValueChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
  };

  return (

    <form>
      <AudioOutlined />
      <input id="value" type="text" value={value} onChange={handleChange} />
    </form>
  );
};

export default MyForm;
