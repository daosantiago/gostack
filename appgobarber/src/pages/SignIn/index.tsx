import React from 'react';
import { Image } from 'react-native';

import { Container, Title } from './styles';
import { View, Text, StatusBar } from 'react-native';

import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg}></Image>
      <Title>Faça seu logon</Title>
    </Container>
  );
};

export default SignIn;
