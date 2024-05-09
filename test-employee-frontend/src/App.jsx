import Auth from './pages/Auth';
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';
import NotFound from './pages/NotFound';
import Header from './components/Header';

function App() {
  return (
    <div className="wrapper">
      <Header />

      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
