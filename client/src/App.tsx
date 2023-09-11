import React, { useEffect, useState } from 'react';
import Form from './components/Form/Form';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Sports from './components/Sports/Sports';
import AddSport from './components/AddSport/AddSport';
import SportDetail from './components/SportDetail/SportDetail';
import ManageSports from './components/ManageSports/ManageSports';
import ManageUsers from './components/ManageUsers/ManageUsers';
import ManageSportGroup from './components/ManageSportGroup/ManageSportGroup';
import EditSport from './components/EditSport/EditSport';
import EditUser from './components/EditUser/EditUser';
import EmailVerify from './components/EmailVerify/EmailVerify';
import SportGroupTable from './components/SportGroupTable/SportGroupTable';
import AddSportGroup from './components/AddSportGroup/AddSportGroup';




function App() {

  const [isAdmin, setIsAdmin] = useState(false)
  const user = JSON.parse(localStorage.getItem('profile')!) || "";

  useEffect(() => {
    if (user && user.result.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user])

  return (
    <BrowserRouter >
      <Navbar />
      <Routes>

        <Route path='/' element={<Navigate to="/sports" />} />
        <Route path="/login" index element={<Form />} />
        <Route path="/add-user" index element={<Form />} />
        <Route path="/sports" index element={<Sports />} />
        <Route path="/sports/search/sport" element={<Sports />} />
        <Route path="/add-sport" element={isAdmin ? (<AddSport />) : (<Sports />)} />
        <Route path="/sports/:id" element={<SportDetail />} />
        <Route path="/edit-sports" element={isAdmin ? (<ManageSports />) : (<Sports />)} />
        <Route path="/groups/:id" element={isAdmin ? (<SportGroupTable />) : (<Sports />)} />
        <Route path="/add-group/:id" element={isAdmin ? (<AddSportGroup />) : (<Sports />)} />
        <Route path="/edit-users" element={isAdmin ? (<ManageUsers />) : (<Sports />)} />
        <Route path="/edit-user/:id" element={isAdmin ? (<EditUser />) : (<Sports />)} />
        <Route path="/edit-group/:id/:groupId" element={isAdmin ? (<ManageSportGroup />) : (<Sports />)} />
        <Route path="/edit-class/:id" element={isAdmin ? (<EditSport />) : (<Sports />)} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
