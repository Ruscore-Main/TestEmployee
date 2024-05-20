import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';
import Header from './components/Header';
import { AdminPage, Auth, Home, NotFound } from 'pages';
import EditTest from 'pages/EditTest';
import TakeTest from 'pages/TakeTest';

function App() {
  return (
    <div className="wrapper">
      <Header />

      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Auth />} />
          <Route exact path="edit-test/:id" element={<EditTest />} />
          <Route exact path="take-test/:id" element={<TakeTest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
