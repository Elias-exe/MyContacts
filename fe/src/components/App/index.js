import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';
import ToastContainer from '../Toast/ToastContainer';
import { Container } from './styles';
import Header from '../Header';
import Routes from '../../Router';
import { AuthProvider } from '../../Context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <ToastContainer />
        <Container>
          <Header />
          <Routes />
        </Container>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
