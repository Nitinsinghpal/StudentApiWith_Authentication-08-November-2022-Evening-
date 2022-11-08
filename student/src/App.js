// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import Home from './Screens/Home';
import Header from './Screens/Header';
import Class from './Screens/Class';
import Student from './Screens/Student';
import Login from './Screens/Login';
import Register from './Screens/Register';
import PreviousState from './Demo/PreviousState';
import { CheckBox } from './Demo/CheckBox';
import BulkApp from './BulkRegister/App';
import MultipleCheckBox from './Demo/MultipleCheckBox';
import UseState from './Demo/UseState';
import ForgotPassword from './Screens/ForgotPassword/ForgotPassword';
import NewPassword from './Screens/ForgotPassword/NewPassword';
import { ProtectedRoute } from './Auth/Protected-route';
import Test from './Authenticate/Test';
import React, { useState } from 'react';
import { AppLayout } from './Auth/App-layout';
import { LandingPage } from './Auth/Landing-page';
import NotFound from './Screens/NotFound';
import Routing from './Routing/Routing';
import Socket from './Socket/socket';



function App() {
  const [isAuth, setIsAuth] = useState(false);
  const loggedIn=true;
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header/> */}
        <Routes>
          <Route element={<Header />}>
    
            <Route path='/' element={<Home />} />
            <Route path='/class' element={<Class />} />
            <Route path='/student' element={<Student />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/previousState' element={<PreviousState />} />
            <Route path='/checkBox' element={<CheckBox />} />
            <Route path='/bulkApp' element={<BulkApp />} />
            <Route path='/multiCheckBox' element={<MultipleCheckBox />} />
            <Route path='/useState' element={<UseState />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
            <Route path='/newPassword' element={<NewPassword />} />
            <Route path='/route' element={<Routing />}/>
            <Route path='/socket' element={<Socket />}/>
          </Route>
          <Route path='*' element={<NotFound />} />
          {/* <Route path='/test' element={<ProtectedRoute path='/test' component={Test} isAuth={isAuth}/>}/> */}

          {/* <Route exact path="/login" > */}
            {/* </Route> */}
          {/* <Route exact path="/land" component={LandingPage} />
        
        <ProtectedRoute exact path="/app" component={AppLayout} />
        
        
        <Route path="*" component={() => "404 NOT FOUND"} />
      */}



          {/* <Route path='/home' element={<Home/>}/>
          <Route path='/about' element={<About/>}/> */}

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
