import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RecruiterPage from './pages/RecruiterPage';
import DevPage from './pages/DevPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecruiterPage />} />
        <Route path="/dev" element={<DevPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
