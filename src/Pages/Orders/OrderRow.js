import React, { useEffect, useState } from 'react'

const OrderRow = ( {order, handleDelete}) => {

    const {serviceName, customer,  price, service, phone, _id} = order;

    const [orderService, setOrderService] = useState({})

    useEffect( () => {
        fetch(`https://genius-car-server-xi-lyart.vercel.app/services/${service}`)
        .then(res => res.json())
        .then(data => setOrderService(data))
    }, [service])



  return (
      <tr>
          <th>
              <label>
                  <button onClick={() => {handleDelete(_id)}} className='btn btn-ghost'>x</button>
              </label>
          </th>
          <td>
              <div className="flex items-center space-x-3">
                  <div className="avatar">
                      <div className="rounded w-12 h-12">
                          {
                            orderService?.image &&
                            <img src={orderService.img} alt="Avatar Tailwind CSS Component" />
                          }
                      </div>
                  </div>
                  <div>
                      <div className="font-bold">{customer}</div>
                      <div className="text-sm opacity-50">{phone}</div>
                  </div>
              </div>
          </td>
          <td>
              {serviceName}
              <br />
              <span className="badge badge-ghost badge-sm">${price}</span>
          </td>
          <th>
              <button className="btn btn-ghost btn-xs">details</button>
          </th>
      </tr>
  )
}

export default OrderRow