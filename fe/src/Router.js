import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NewContact from './pages/NewContact';
import Categories from './pages/Categories';
import EditContact from './pages/EditContact';
import Register from './pages/Register';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/new" element={<NewContact />} />
      <Route path="/newCategory" element={<Categories />} />
      <Route path="/edit/:id" element={<EditContact />} />
    </Routes>
  );
}