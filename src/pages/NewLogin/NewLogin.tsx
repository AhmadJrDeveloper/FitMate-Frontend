import React, { useState } from 'react';
import './NewLogin.css'
interface LoginFormProps {
  mode: string;
  onSubmit: () => void;
}

const NewLogin: React.FC = () => {
  const [mode, setMode] = useState<string>('login');

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'login' ? 'signup' : 'login'));
  };

  return (
    <div>
      <div className={`form-block-wrapper form-block-wrapper--is-${mode}`}></div>
      <section className={`form-block form-block--is-${mode}`}>
        <header className="form-block__header">
          <h1>{mode === 'login' ? 'Welcome back!' : 'Sign up'}</h1>
          <div className="form-block__toggle-block">
            <span>{mode === 'login' ? "Don't" : 'Already'} have an account? Click here &#8594;</span>
            <input id="form-toggler" type="checkbox" onClick={toggleMode} />
            <label htmlFor="form-toggler"></label>
          </div>
        </header>
        <LoginForm mode={mode} onSubmit={() => console.log('submit')} />
      </section>
    </div>
  );
};

const LoginForm: React.FC<LoginFormProps> = ({ mode, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div className="form-block__input-wrapper">
      <div className="form-group form-group--login">
        <Input type="text" id="username" label="user name" disabled={mode === 'signup'} />
        <Input type="password" id="password" label="password" disabled={mode === 'signup'} />
      </div>
      <div className="form-group form-group--signup">
        <Input type="text" id="fullname" label="full name" disabled={mode === 'login'} />
        <Input type="email" id="email" label="email" disabled={mode === 'login'} />
        <Input type="password" id="createpassword" label="password" disabled={mode === 'login'} />
        <Input type="password" id="repeatpassword" label="repeat password" disabled={mode === 'login'} />
      </div>
    </div>
    <button className="button button--primary full-width" type="submit">{mode === 'login' ? 'Log In' : 'Sign Up'}</button>
  </form>
);

interface InputProps {
  id: string;
  type: string;
  label: string;
  disabled: boolean;
}

const Input: React.FC<InputProps> = ({ id, type, label, disabled }) => (
  <input className="form-group__input" type={type} id={id} placeholder={label} disabled={disabled} />
);

export default NewLogin;
