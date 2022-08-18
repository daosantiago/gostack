import { createGlobalStyle } from 'styled-components';
import githubBg from '../assets/githubBg.svg';

export default createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

body {
  background: #F0F0F5 url(${githubBg}) no-repeat 70% top;
  --webkit-font-smoothing: antialiased;
}

body, input, button {
  font: 16px Roboto;
}

#root {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px;
}

button{
  cursor: pointer;
}

`;
