import React,{useState,useEffect} from 'react';
import Landing_page from './components/Landing_page';
import Form_for_vote from './components/Form_for_vote';
import { Route,Routes,Link } from 'react-router-dom';
import Success from './components/success';
import Failure from './components/failure';
import Login from './components/login';
import Result from './components/admin/result';
import Register from './components/register';
import Admin_navi from './components/admin/admin_navi';
import Team_edit from './components/admin/team_add';
import Teamlist from './components/admin/teamlist';

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Landing_page/>}/>
          <Route path='/formforvote' element={<Form_for_vote/>}/>
          <Route path='/success' element={<Success/>}/>
          <Route path='/failure' element={<Failure/>}/>
          <Route path='/result' element={<Result/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/admin' element={<Admin_navi/>}/>
          <Route path='/teamadd' element={<Team_edit/>}/>
          <Route path='/teamlist' element={<Teamlist/>}/>
        </Routes>
    </>
  );
}

export default App;
