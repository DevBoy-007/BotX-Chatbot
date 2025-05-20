import { Routes,Route } from 'react-router-dom';
import Loginpage from '../pages/login';
import Signpage from '../pages/sign'
import Botlayout from '../layout/botlayout';
import Assistant from '../pages/asistant';
import NoPage from '../pages/nopage';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from '../components/protectedroutes';
const Approutes=()=>{
 return (
 <>
 <ToastContainer />
 <Routes>
  <Route path='/' element={<Loginpage/>}/>
 <Route path='/signIn' element={<Signpage/>}/>
 <Route path='/home' element={<ProtectedRoute><Botlayout/></ProtectedRoute>}/>
 <Route path='/virtual-assistant' element={<ProtectedRoute><Assistant/></ProtectedRoute>}/>
 <Route path="*" element={<NoPage/>} />
</Routes>
 </>
)       
}
export default Approutes ;