// ProtectedRoute.jsx
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('UserToken');
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
