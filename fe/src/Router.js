import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NewContact from './pages/NewContact';
import Categories from './pages/Categories';
import EditContact from './pages/EditContact';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './utils/ProtectedRoute';

export default function Router() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login />} />
      <Route
        path="/home"
        element={(
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
      )}
      />
      <Route path="/new" element={<NewContact />} />
      <Route path="/newCategory" element={<Categories />} />
      <Route path="/edit/:id" element={<EditContact />} />
    </Routes>

  );
}
