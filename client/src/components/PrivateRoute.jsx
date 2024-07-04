import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);

  return (
    <>
    {/* Outlet is the childern of the parent component (PrivateRoute) */}
        {currentUser ? <Outlet/> : <Navigate to='/login'/>}
    </>
    
  )
}
