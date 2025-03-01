import NavBar from './components/NavBar';
import {Routes,Route, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Settings from './pages/Settings';
import ProfilePage from './pages/ProfilePage';
import { userAuthStore } from './store/userAuthStore.js';
import { useEffect } from 'react';
import {Loader} from 'lucide-react';
import Toaster from 'react-hot-toast';

const App = () => {
  const {authUser,checkAuth,isCheckingAuth}=userAuthStore();
  useEffect(()=>{
     checkAuth();
  },[checkAuth]);

  //Should check this logic.

  /*if(isCheckingAuth||!authUser){
    return(
      <div className="flex items-center justify-center h-screen">
    <Loader className="size-10 animate-spin" />
    </div>

    )
  }*/

  console.log(authUser);
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={authUser?<HomePage/>:<Navigate to="/login"/>}/>
        <Route path='/signup' element={!authUser?<SignUpPage/>:<Navigate to="/"/>}/>
        <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to="/"/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/profile' element={authUser?<ProfilePage/>:<Navigate to="/login"/>}/>
      </Routes>

      <Toaster/>
    </div>

  );
};

export default App;

