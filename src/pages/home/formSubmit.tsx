import React from 'react';
import styles from './index.less';

interface MyFormProps {
  onSubmit: (ccId: number, answer: string) => void;
}

const formProps: MyFormProps = {
  onSubmit: (ccId: number, answer: string) => {}
};

export default function SubmitButton({ onSubmit }: MyFormProps) {
  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(0, "answer");
  };

  return (
    <React.Fragment>
      <form onSubmit={formSubmit} action="/submit-form" method="post">
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
}
