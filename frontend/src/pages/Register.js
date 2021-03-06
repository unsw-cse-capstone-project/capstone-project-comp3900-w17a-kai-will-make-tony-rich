import React from 'react';
import { Main, Header, Form, Href, isEmailValid } from '../components/Form';
import { API_URL } from '../utils/api';
import Buttons from '../components/Buttons';
import Radios from '../components/Radios';
import { ControlledInput } from '../components/Input';
import { StoreContext } from '../utils/store';

export default function Register(props) {
	const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [employer, setEmployer] = React.useState(true);
  const { setAlert } = React.useContext(StoreContext);
	
	const handleNameChange = (event) => {
    setName(event.target.value);
  }

	const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

	const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

	const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  }

	const handleEmployerChange = () => {
    setEmployer(!employer);
  }

	async function register() {
    if (!/^([A-Z][a-z]{1,} ){1,}[A-Z][a-z]{1,}$/.test(name)) {
      setAlert({ open: true, severity: 'warning', message: 'Please enter a valid name' });
    } else if (!isEmailValid(email)) {
      setAlert({ open: true, severity: 'warning', message: 'Please enter a valid email' });
    } else if (!password) {
      setAlert({ open: true, severity: 'warning', message: 'Please enter your password' });
    } else if (password.length < 3) {
      setAlert({ open: true, severity: 'warning', message: 'Password must be at least 3 characters long' });
    } else if (password !== confirmPassword) {
      setAlert({ open: true, severity: 'warning', message: 'Password does not match' });
    } else {
      const data = { name, email, password, employer };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }
      try {// explicit error checking
        const response = await fetch(`${API_URL}/auth/register`, options);
        // implicit error checking
        if (response.status === 200) {
          const json = await response.json();
          props.login(json.token);
          return employer ? 'employer' : 'jobseeker';
        } else if (response.status === 409) {
          setAlert({ open: true, severity: 'info', message: 'Email already exists' });
        } else {
          setAlert({ open: true, severity: 'error', message: 'Oops something went wrong' });
        }
      } catch (error) {
        setAlert({ open: true, severity: 'warning', message: error.message });
      }
    }
    return '';
	}

  return (
    <Main>
      <Header>Sign Up</Header>
      <Form id="register">
        <ControlledInput type="text" id="Full Name" value={name} handleChange={handleNameChange} />
        <ControlledInput type="email" id="Email Address" value={email} handleChange={handleEmailChange} />
        <ControlledInput type="password" id="Password" value={password} handleChange={handlePasswordChange} />
        <ControlledInput type="password" id="Confirm Password" value={confirmPassword} handleChange={handleConfirmPasswordChange} />
        <Radios
          value={employer}
          onChangeHandler={handleEmployerChange}
        />
      </Form>
      <Href route='login'>Already have an account? No worries, come login here</Href>
      <Buttons
        primaryRoute={register}
        secondaryRoute='/'
        primaryInnerText='Register'
        secondaryInnerText='Back'
        login={props.login}
      />
    </Main>
  )
}
