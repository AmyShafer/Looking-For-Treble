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
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

// export function SignupForm(props) {
//   const { switchToSignin } = useContext(AccountContext);

//   return (
//     <BoxContainer>
//       <FormContainer>
//         <Input type="text" placeholder="Full Name" />
//         <Input type="email" placeholder="Email" />
//         <Input type="password" placeholder="Password" />
//         <Input type="password" placeholder="Confirm Password" />
//       </FormContainer>
//       <Marginer direction="vertical" margin={10} />
//       <SubmitButton type="submit">Signup</SubmitButton>
//       <Marginer direction="vertical" margin="1em" />
//       <MutedLink href="#">
//         Already have an account?
//         <BoldLink href="#" onClick={switchToSignin}>
//           Signin
//         </BoldLink>
//       </MutedLink>
//     </BoxContainer>
//   );
// }

let data;

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  // const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const email = formState.email;
    const username = formState.username;
    const password = formState.password;

    const response = await fetch('http://localhost:3001/create', {
        method: 'POST',
        body: JSON.stringify({
          email,
          username,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if(response.status(200)){
        alert('User Created, please log in');
      } else {
        alert('User Creation Failed');
      }
  //   try {
  //     const { data } = await addUser({
  //       variables: { ...formState },
  //     });

  //     Auth.login(data.addUser.token);
  //   } catch (e) {
  //     console.error(e);
  //   }
   };

  return (
    <BoxContainer>
      {data ? (
        <p>
          Success! You may now head <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
        <FormContainer onSubmit={handleFormSubmit}>
          <Input
            type="text"
            placeholder="Full Name"
            name="fullname"
            value={formState.name}
            onChange={handleChange}
          />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formState.password}
            onChange={handleChange}
          />
          <Input type="password" placeholder="Confirm Password" />{' '}
        </FormContainer>
      )}
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit">Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
