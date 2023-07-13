import React, { useContext, useState } from 'react';
import img from '../../assets/images/login/login.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { FaGoogle, FaGithub } from "react-icons/fa";
import { GoogleAuthProvider } from 'firebase/auth';



const Login = () => {

    const [error, setError] = useState('');

    const {signin, providerLogin} = useContext(AuthContext);

    const navigate = useNavigate();

    const location = useLocation();

    const from = location.state?.from?.pathname  || '/';

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignin = () => {
        providerLogin(googleProvider)
        .then(result => {
            const user = result.user;
        })
        .catch(err => {
            console.error(err)
        })
    }

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signin(email, password)
        .then(result=> {
            const user = result.user;
            form.reset();
            setError('');
            navigate(from, {replace:true});
        })
        .catch(error => {
            console.error(error)
            setError(error.message)
        })
    }
  return (


      <div>
          <div className="hero w-full">
              <div className="hero-content grid mid:grid-col-2 flex-col lg:flex-row">
                  <div className="text-center lg:text-left">
                      <img src={img} alt='' />
                  </div>
                  <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                      <h1 className="text-5xl text-center font-bold">SignIn</h1>
                      <form onSubmit={handleLogin} className="card-body">
                          <div className="form-control">
                              <label className="label">
                                  <span className="label-text">Email</span>
                              </label>
                              <input type="text" name='email' placeholder="email" className="input input-bordered" />
                          </div>
                          <div className="form-control">
                              <label className="label">
                                  <span className="label-text">Password</span>
                              </label>
                              <input type="text" name='password' placeholder="password" className="input input-bordered" />
                              <label className="label">
                                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                              </label>
                          </div>
                          <div className="form-control mt-6">
                              <input className='btn btn-primary' type='submit' value='Login' />
                          </div>
                      </form>
                      <p className='text-red-600 text-sm font-semibold'>{error}</p>
                      <p className='text-center'>Or</p>
                      <button onClick={handleGoogleSignin} className="btn btn-outline btn-accent"><FaGoogle></FaGoogle></button>
                      <button className="btn btn-outline btn-accent"><FaGithub></FaGithub></button>
                      <p className='text-center my-6 '>New to Genius Car?<Link className='text-orange-600 font-bold' 
                      to='/signup'>SignUp</Link></p>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Login