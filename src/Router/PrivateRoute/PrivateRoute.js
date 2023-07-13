import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);

    const location = useLocation();

    if(loading) {
        return <span className="loading loading-spinner text-info"></span>
    }

    if(!user) {
        return <Navigate to='/login' state={{from: location}} replace></Navigate>
    }
    return children
}

export default PrivateRoute