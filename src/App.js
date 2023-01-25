import React from 'react';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from "react-router-dom"
import CardsDetail from './components/CardsDetail';
import Cards from './components/Cards';

const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Cards/>}/>
        <Route path='/cart/:id' element={<CardsDetail/>}/>
      </Routes>
    </>
  );
}

export default App;
