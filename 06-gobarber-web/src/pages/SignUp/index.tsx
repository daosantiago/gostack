import React from 'react';
import {
  FiArrowDownLeft,
  FiLogIn,
  FiMail,
  FiLock,
  FiUser,
} from 'react-icons/fi';

import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';

const SignUp: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Faça seu cadastro</h1>
        <Input name="name" icon={FiUser} placeholder="Nome" />
        <Input name="email" icon={FiMail} placeholder="E-Mail" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />

        <Button>Cadastrar</Button>
      </form>

      <a href="criar">
        <FiArrowDownLeft />
        Voltar para Logon
      </a>
    </Content>
    <Background />
  </Container>
);
export default SignUp;
