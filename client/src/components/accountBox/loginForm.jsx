import React, { useContext, useState } from 'react';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from './common';
import { Marginer } from '../marginer';
import { AccountContext } from './accountContext';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import App, {setTokenState} from '../../App';
import Auth from '../../utils/auth';

const LoginForm = (props) => {
  const { switchToSignup } = useContext(AccountContext);

  const [formState, setFormState] = useState({ email: '', password: '' });
  let data;
  //const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // try {
    //   const { data } = await fetch({
    //     variables: { ...formState },
    //   });
    //   console.log('Log in successful');
    //   Auth.login(data.login.token);
    // } catch (e) {
    //   console.error(e);
    // }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
    const email = formState.email;
    const password = formState.password;

    if (email && password) {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log('Username found');
      // console.log(formState.email);
      // console.log(formState.password);

      

      if (response.status === 200) {
        const token = await response.json();
      // If successful, redirect the browser to the profile page
        document.location.replace('/profile');
      } else {
        alert('Invalid Credentials');
      }
    }
  };

  return (
    <div>
      <BoxContainer>
        {data ? (
          <p>
            Success! You may now head <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <Input
              type="email"
              placeholder="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              placeholder="******"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
            <Marginer direction="vertical" margin={10} />
            <MutedLink href="#">Forget your password?</MutedLink>
            <Marginer direction="vertical" margin="1em" />
            <SubmitButton type="submit">Signin</SubmitButton>{' '}
          </form>
        )}
        <Marginer direction="vertical" margin="1em" />
        <MutedLink href="#">
          Don't have an account?{' '}
          <BoldLink href="#" onClick={switchToSignup}>
            Signup
          </BoldLink>
        </MutedLink>
      </BoxContainer>
    </div>
  );
};

export default LoginForm;
