import React, { useContext } from 'react'
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const {_id, title, price} = useLoaderData();
    const {user} = useContext(AuthContext);

    const handleOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name, 
            email, phone, message

        }


        fetch('https://genius-car-server-xi-lyart.vercel.app/orders', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged) {
                alert('Order placed successfully')
                form.reset();
            }
        })
        .catch(err => console.error(err));
    }

  return (
      <form onSubmit={handleOrder}>
          <h2 className='text-2xl p-6'>Service to checkout: {title}</h2>
          <p className='text-xl p-6'>Price: {price}</p>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-4'>
              <input name='firstName' type="text" placeholder="First Name" className="input input-ghost w-full input-border" />
              <input name='lastName' type="text" placeholder="Last Name" className="input input-ghost w-full  input-border" />
              <input name='email' type="text" placeholder="Email" defaultValue={user?.email} className="input input-ghost w-full  input-border" />
              <input name='phone' type="text" placeholder="Phone number" className="input input-ghost w-full  input-border" />
          </div>
          <textarea name='message' className="textarea textarea-bordered h-24 w-full" placeholder="Your message to us..."></textarea>
          <input className='btn m-6' type='submit' value='Place Order'></input>
      </form>
  )
}

export default Checkout