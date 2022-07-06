import React, {useEffect} from 'react'
import {Routes, Route} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {AuthPage} from "./pages/AuthPage";
import {AirportPage} from "./pages/AirportPage";
import {TheNavigation} from "./components/TheNavigation";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {fetchHandbooks} from "./store/ActionCreators";

function App() {
  const {} = useAppSelector(state => state.handbookReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchHandbooks())
  }, [dispatch])

  return (
    <>
      <TheNavigation/>
      <div className="container mx-auto pt-4">
        <Routes>
          <Route path={'/'} element={<MainPage/>}/>
          <Route path={'/auth'} element={<AuthPage/>}/>
          <Route path={'/airport/:id'} element={<AirportPage/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
