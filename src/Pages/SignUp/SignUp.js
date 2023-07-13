import React, { useContext } from 'react';
import img from '../../assets/images/login/login.svg'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const SignUp = () => {
    const {createUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSignup = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    

    createUser(email, password)
    .then(result=> {
        const user = result.user;
        navigate('/login');
    })
    .catch(error => console.error(error));
    }
  return (
      <div className="hero w-full">
          <div className="hero-content grid mid:grid-col-2 flex-col lg:flex-row">
              <div className="text-center lg:text-left">
                  <img src={img} alt='' />
              </div>
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                  <h1 className="text-5xl text-center font-bold">SignUp</h1>
                  <form onSubmit={handleSignup} className="card-body">
                      <div className="form-control">
                          <label className="label">
                              <span className="label-text">Name</span>
                          </label>
                          <input type="text" name='name' placeholder="Fullname" className="input input-bordered" />
                      </div>
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
                      </div>
                      <div className="form-control mt-6">
                          <input className='btn btn-primary' type='submit' value='Sign Up' />
                      </div>
                  </form>
                  <p className='text-center'>Already have an account?<Link className='text-orange-600 font-bold' to='/login'>Login</Link></p>
              </div>
          </div>
      </div>
  )
}

export default SignUp