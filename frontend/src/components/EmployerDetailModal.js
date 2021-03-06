import React from 'react';
import styled from "styled-components";
import { Header, Form, ModalContainer, ModalContent, CloseButton, EditAvatar } from './Form';
import { ControlledInput } from './Input';

const Button = styled.button`
  width: 13vmin;
  height: 5vmin;
  font-size: 1.5vmin;
  border-radius: 5px;
  background: whitesmoke;
  color: black;
  border: 3px solid darkcyan;
  margin: 0.75vw;

  &:hover {
    font-weight: bold;
    background: black;
    color: whitesmoke;
    border: 1px solid whitesmoke;
  }
`;

export default function EmployerDetailModal({
  name, setName, password, setPassword, location, setLocation, profile, setProfile, company, setCompany, cancel, updateProfile,
}) {
  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={(e) => {
            e.stopPropagation();
            cancel();
        }}/>
        <Header>Update Details</Header>
        <EditAvatar profile={profile} setProfile={setProfile} />
        <Form id="register">
          <ControlledInput value={name} type="text" id="Name" handleChange={(e) => setName(e.target.value)} />
          <ControlledInput value={password} type="password" id="Password" handleChange={(e) => setPassword(e.target.value)} />
          <ControlledInput value={company} type="text" id="Company" handleChange={(e) => setCompany(e.target.value)} />
          <ControlledInput value={location} type="text" id="Location" handleChange={(e) => setLocation(e.target.value)} />
        </Form>
        <Button onClick={() => updateProfile()}>Save</Button>
      </ModalContent>
    </ModalContainer>
  )
}