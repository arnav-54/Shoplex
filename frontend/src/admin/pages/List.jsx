import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {

      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse());
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {

      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='p-6 animate-fade-in-up'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold gradient-text mb-2'>Product Inventory</h1>
        <p className='text-gray-600'>Manage all your products in one place</p>
      </div>
      
      <div className='admin-table'>
        {/* ------- Table Header ---------- */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center admin-table-header'>
          <span className='font-semibold'>Image</span>
          <span className='font-semibold'>Product Name</span>
          <span className='font-semibold'>Category</span>
          <span className='font-semibold'>Price</span>
          <span className='font-semibold text-center'>Actions</span>
        </div>

        {/* ------ Product List ------ */}
        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 admin-table-row' key={index}>
              <div className='flex items-center justify-center'>
                <img className='w-16 h-16 object-cover rounded-xl border-2 border-orange-100' src={item.image[0]} alt={item.name} />
              </div>
              
              <div>
                <p className='font-semibold text-amber-800 mb-1'>{item.name}</p>
                <p className='text-sm text-gray-600 line-clamp-2'>{item.description}</p>
              </div>
              
              <div>
                <span className='badge badge-primary'>{item.category}</span>
              </div>
              
              <div>
                <p className='text-lg font-bold text-amber-800'>{currency}{item.price}</p>
              </div>
              
              <div className='flex justify-center'>
                <button 
                  onClick={()=>removeProduct(item._id)} 
                  className='w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110'
                  title='Delete Product'
                >
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                  </svg>
                </button>
              </div>
            </div>
          ))
        }
        
        {list.length === 0 && (
          <div className='admin-table-row text-center py-12'>
            <div className='col-span-full'>
              <svg className='w-16 h-16 text-gray-300 mx-auto mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' />
              </svg>
              <p className='text-gray-500 text-lg'>No products found</p>
              <p className='text-gray-400 text-sm'>Add your first product to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default List