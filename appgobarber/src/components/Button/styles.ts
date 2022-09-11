import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #ff9000;
  border-radius: 10px;

  flex-direction: row;
  align-items: center;
`;

export const ButtonText = styled.Text`
  flex: 1;
  font-size: 18px;
  color: #312e38;

  text-align: center;

  font-family: 'RobotoSlab-Midium';
`;
