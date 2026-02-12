import { AppRoutes } from './app/routes';
import { Providers } from './app/providers';
import './App.css';

function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}

export default App;
