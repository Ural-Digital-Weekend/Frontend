import React from 'react'
import {Link} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../hooks/redux"
import {authSlice} from "../store/slices/AuthSlice"

export function TheNavigation() {
  const dispatch = useAppDispatch()
  const {username, isAuthenticated} = useAppSelector(state => state.authReducer)

  const logoutHandler = (event: React.MouseEvent) => {
    event.preventDefault()
    dispatch(authSlice.actions.logout())
  }

  return (
    <nav className="flex justify-between w-full items-center drop-shadow h-[50px] px-5 bg-gray-100">
      <h3><Link to={'/'}>Airports</Link></h3>

      <div>
        {
          !isAuthenticated
            ? <Link to={'/auth'}>Auth</Link>
            : <>
                <span className="font-bold mr-4">{username}</span>
                <a href="#" onClick={logoutHandler}>Logout</a>
              </>
        }
      </div>
    </nav>
  )
}