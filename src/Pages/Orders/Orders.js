import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider'
import OrderRow from './OrderRow';

const Orders = () => {
    const {user} = useContext(AuthContext);
    
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`https://genius-car-server-xi-lyart.vercel.app/orders?email=${user?.email}`)
        .then(res => res.json())
        .then(data => setOrders(data))
    }, [user?.email])

    const handleDelete = id => {
        const proceed = window.confirm('Do you really want to proceed!');
        if(proceed){
            fetch(`https://genius-car-server-xi-lyart.vercel.app/orders/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if(data.deleteCount > 0) {
                    alert('Selected order deleted successfully!')
                }
                const leftOrder = orders.filter(ordr => ordr._id !==id);
                setOrders(leftOrder)

            })
        }
    }


  return (
      <div>
          <div className="overflow-x-auto">
              <table className="table">
                  <thead>
                      <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Selected Service</th>
                          <th>Remark</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                          orders?.map(order => <OrderRow
                              key={order._id}
                              order={order}
                              handleDelete={handleDelete}
                          ></OrderRow>)
                      }
                  </tbody>
              </table>
          </div>
      </div>
  )
}

export default Orders