import React from 'react';
import './App.css';
import { PrivateRoute } from './components/PrivateRoute';
import {Routes, Route} from 'react-router-dom'
import { AdminLayout } from './components/AdminLayout';
import Login from './features/auth/pages/Login';
import Journal from './features/journal/pages/Journals';
import Scheme from './features/scheme/pages/Scheme';
import AddJournal from './features/journal/pages/AddJournal';

function App() {
  return (
    <Routes>
      <Route path="" element={<Login/>}/>
      <Route path="/dashboard"  element={<PrivateRoute component={AdminLayout}/>}>
        <Route index path="journal" element={<Journal/>}></Route>
        <Route key={'new-journal'} path="new-journal" element={<AddJournal/>}></Route>
        <Route key={'edit-journal'} path="new-journal/:id" element={<AddJournal/>}></Route>
       
        <Route path="scheme" element={<Scheme/>}></Route>
      </Route>
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  
  );
}

export default App;
