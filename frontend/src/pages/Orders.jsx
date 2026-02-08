import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
import { Package, Truck, CheckCircle, Clock, MapPin, X } from 'lucide-react';

const Orders = () => {

  const { backendUrl, token, currency, formatPrice } = useContext(ShopContext);

  const [orderData, setorderData] = useState([])
  const [showTracking, setShowTracking] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { Authorization: `Bearer ${token}` } })
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
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
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  const getStatusStep = (status) => {
    const steps = ['Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered'];
    const index = steps.indexOf(status);
    return index === -1 ? 0 : index + 1;
  }

  return (
    <div className='border-t pt-16 min-h-[60vh] pb-20'>

      <div className='text-3xl mb-10'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className='space-y-6 max-w-6xl mx-auto'>
        {orderData.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
            <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
          </div>
        ) : (
          orderData.map((item, index) => (
            <div key={index} className='modern-card flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6 hover:shadow-lg transition-all'>
              <div className='flex items-start gap-6'>
                <div className="relative">
                  <img className='w-24 h-24 object-cover rounded-xl border border-gray-200 shadow-sm' src={item.image[0]} alt={item.name} />
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md">
                    {item.quantity}
                  </span>
                </div>
                <div>
                  <h3 className='text-xl font-bold text-gray-800 font-playfair'>{item.name}</h3>
                  <div className='flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600'>
                    <span className='font-bold text-amber-700 text-lg'>{currency}{formatPrice(item.price)}</span>
                    <span className='w-1 h-1 bg-gray-300 rounded-full'></span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">Size: {item.size}</span>
                    <span className='w-1 h-1 bg-gray-300 rounded-full'></span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">{item.paymentMethod}</span>
                  </div>
                  <p className='mt-3 text-sm flex items-center gap-2 text-gray-500'>
                    <Clock size={14} />
                    Ordered on: <span className='text-gray-700 font-medium'>{new Date(Number(item.date)).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>

              <div className='md:w-1/3 flex flex-col md:items-end justify-between gap-4'>
                <div className='flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm'>
                  <span className={`w-3 h-3 rounded-full ${item.status === 'Delivered' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`}></span>
                  <p className='text-sm font-semibold text-gray-700'>{item.status}</p>
                </div>
                <button
                  onClick={() => { setSelectedOrder(item); setShowTracking(true) }}
                  className='btn-secondary py-2.5 px-6 flex items-center gap-2 text-sm hover:translate-x-1 transition-transform'
                >
                  Track Order <Truck size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>


      {showTracking && selectedOrder && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in'>
          <div className='bg-white rounded-2xl max-w-lg w-full p-8 relative shadow-2xl animate-fade-in-up border border-gray-100'>
            <button onClick={() => setShowTracking(false)} className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors'>
              <X size={24} />
            </button>

            <div className="text-center mb-8">
              <h3 className='text-2xl font-bold text-gray-900 flex items-center justify-center gap-3'>
                <Truck className='text-amber-600' size={28} />
                Order Tracking
              </h3>
              <p className="text-gray-500 text-sm mt-1">Track the status of your order</p>
            </div>

            <div className='flex items-center gap-4 mb-8 p-4 bg-amber-50/50 rounded-xl border border-amber-100'>
              <img className='w-16 h-16 object-cover rounded-lg shadow-sm' src={selectedOrder.image[0]} alt='' />
              <div>
                <p className='font-bold text-gray-800 text-lg'>{selectedOrder.name}</p>
                <p className='text-sm text-gray-600 font-medium'>Qty: {selectedOrder.quantity} <span className="mx-1 text-gray-300">|</span> Size: {selectedOrder.size}</p>
              </div>
            </div>

            <div className='relative pl-4'>
              <div className="absolute left-6 top-2 bottom-4 w-0.5 bg-gray-100"></div>

              <div className='space-y-6'>
                {[
                  { status: 'Order Placed', icon: Package, date: new Date(Number(selectedOrder.date)).toLocaleDateString() },
                  { status: 'Packing', icon: Package },
                  { status: 'Shipped', icon: Truck },
                  { status: 'Out for delivery', icon: MapPin },
                  { status: 'Delivered', icon: CheckCircle }
                ].map((step, index) => {
                  const currentStepIndex = ['Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered'].indexOf(selectedOrder.status);
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div key={index} className='flex items-center gap-4 relative z-10'>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${isCompleted
                          ? 'bg-amber-500 border-amber-100 text-white shadow-lg shadow-amber-200'
                          : 'bg-white border-gray-100 text-gray-300'
                        } ${isCurrent ? 'scale-110 ring-4 ring-amber-50' : ''}`}>
                        <step.icon size={isCompleted ? 20 : 18} />
                      </div>
                      <div className='flex-1'>
                        <p className={`font-bold text-lg transition-colors duration-300 ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                          {step.status}
                        </p>
                        {step.date && <p className='text-xs text-gray-500 font-medium'>{step.date}</p>}
                        {isCurrent && <p className="text-xs text-amber-600 font-bold mt-0.5 animate-pulse">In Progress...</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <button onClick={() => setShowTracking(false)} className="w-full mt-8 btn-primary py-3 rounded-xl text-center">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders
