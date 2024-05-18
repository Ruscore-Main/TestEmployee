import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';
import Header from './components/Header';
import { AdminPage, Auth, Home, NotFound } from 'pages';

function App() {
  return (
    <div className="wrapper">
      <Header />

      <Routes>
          <Route exact path="/login" element={<Auth />} />
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
