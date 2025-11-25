import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

  const { backendUrl, token , currency} = useContext(ShopContext);

  const [orderData,setorderData] = useState([])
  const [showTracking, setShowTracking] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{Authorization: `Bearer ${token}`}})
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className='border-t pt-16'>

        <div className='text-2xl'>
            <Title text1={'MY'} text2={'ORDERS'}/>
        </div>

        <div>
            {
              orderData.map((item,index) => (
                <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div className='flex items-start gap-6 text-sm'>
                        <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                        <div>
                          <p className='sm:text-base font-medium'>{item.name}</p>
                          <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                            <p>{currency}{item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Size: {item.size}</p>
                          </div>
                          <p className='mt-1'>Date: <span className=' text-gray-400'>{new Date(Number(item.date)).toLocaleDateString()}</span></p>
                          <p className='mt-1'>Payment: <span className=' text-gray-400'>{item.paymentMethod}</span></p>
                        </div>
                    </div>
                    <div className='md:w-1/2 flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                            <p className='text-sm md:text-base'>{item.status}</p>
                        </div>
                        <button onClick={() => {setSelectedOrder(item); setShowTracking(true)}} className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-orange-50 transition-colors'>Track Order</button>
                    </div>
                </div>
              ))
            }
        </div>

        {/* Tracking Modal */}
        {showTracking && selectedOrder && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-lg max-w-md w-full p-6'>
              <div className='flex justify-between items-center mb-6'>
                <h3 className='text-lg font-semibold'>Order Tracking</h3>
                <button onClick={() => setShowTracking(false)} className='text-gray-500 hover:text-gray-700'>
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
              
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <img className='w-12 h-12 object-cover rounded' src={selectedOrder.image[0]} alt='' />
                  <div>
                    <p className='font-medium'>{selectedOrder.name}</p>
                    <p className='text-sm text-gray-500'>Qty: {selectedOrder.quantity} | Size: {selectedOrder.size}</p>
                  </div>
                </div>
                
                <div className='border-t pt-4'>
                  <div className='space-y-4'>
                    {[
                      { status: 'Order Placed', completed: true, date: new Date(Number(selectedOrder.date)).toLocaleDateString() },
                      { status: 'Packing', completed: ['Packing', 'Shipped', 'Out for delivery', 'Delivered'].includes(selectedOrder.status), date: selectedOrder.status === 'Packing' ? 'In Progress' : '' },
                      { status: 'Shipped', completed: ['Shipped', 'Out for delivery', 'Delivered'].includes(selectedOrder.status), date: selectedOrder.status === 'Shipped' ? 'In Progress' : '' },
                      { status: 'Out for delivery', completed: ['Out for delivery', 'Delivered'].includes(selectedOrder.status), date: selectedOrder.status === 'Out for delivery' ? 'In Progress' : '' },
                      { status: 'Delivered', completed: selectedOrder.status === 'Delivered', date: selectedOrder.status === 'Delivered' ? 'Completed' : '' }
                    ].map((step, index) => (
                      <div key={index} className='flex items-center gap-3'>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {step.completed && (
                            <svg className='w-2.5 h-2.5 text-white' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                          )}
                        </div>
                        <div className='flex-1'>
                          <p className={`font-medium ${
                            step.completed ? 'text-green-600' : 'text-gray-400'
                          }`}>{step.status}</p>
                          {step.date && <p className='text-xs text-gray-500'>{step.date}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default Orders
