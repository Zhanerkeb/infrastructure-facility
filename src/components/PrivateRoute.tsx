import React from 'react'
import { Navigate } from 'react-router-dom';

interface Props {
    component: React.ComponentType
    redirectPath?: string
}

export const PrivateRoute: React.FC<Props> = ({redirectPath = '/', component: RouteComponent})  => {
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  if (!isLoggedIn) return <Navigate to={redirectPath} replace />
  else return <RouteComponent/>

}

