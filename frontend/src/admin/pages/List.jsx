import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
    <div className='animate-fade-in-up'>
      <div className='flex items-center justify-between mb-10'>
        <div>
          <h1 className='playfair text-4xl font-bold text-amber-900 mb-2'>Product Inventory</h1>
          <p className='text-amber-700 font-medium'>Manage and monitor your store's collection</p>
        </div>
        <div className='hidden sm:flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-orange-200/60 shadow-sm'>
          <svg className='w-5 h-5 text-orange-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
          </svg>
          <input type='text' placeholder='Search products...' className='bg-transparent outline-none text-sm text-amber-800 placeholder-orange-300 w-48' />
        </div>
      </div>

      <div className='admin-table'>
        {/* ------- Table Header ---------- */}
        <div className='hidden md:grid grid-cols-[0.8fr_2.5fr_1fr_1fr_0.8fr] items-center admin-table-header'>
          <span>Image</span>
          <span>Product Details</span>
          <span>Category</span>
          <span>Price</span>
          <span className='text-center'>Actions</span>
        </div>

        {/* ------ Product List ------ */}
        <div className='divide-y divide-orange-100'>
          {
            list.map((item, index) => (
              <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[0.8fr_2.5fr_1fr_1fr_0.8fr] items-center gap-4 admin-table-row group' key={index}>
                <div className='flex items-center justify-center'>
                  <div className='relative overflow-hidden rounded-xl border border-orange-100 group-hover:border-orange-300 transition-colors'>
                    <img className='w-14 h-14 object-cover' src={item.image[0]} alt={item.name} />
                  </div>
                </div>

                <div>
                  <p className='font-bold text-amber-900 group-hover:text-amber-600 transition-colors'>{item.name}</p>
                  <p className='text-xs text-amber-700/80 line-clamp-1 italic'>{item.description}</p>
                </div>

                <div>
                  <span className='badge badge-primary !px-3 !py-1 text-[11px] uppercase tracking-wider font-bold'>{item.category}</span>
                </div>

                <div>
                  <p className='text-lg font-black text-amber-900'>{currency}{item.price}</p>
                </div>

                <div className='flex justify-center gap-3'>
                  <Link
                    to={`/admin/edit/${item._id}`}
                    className='w-9 h-9 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center transition-all duration-300 group/btn border border-orange-100 hover:border-orange-200'
                    title='Edit Product'
                  >
                    <svg className='w-4 h-4 transform group-hover/btn:scale-110' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                    </svg>
                  </Link>
                  <button
                    onClick={() => removeProduct(item._id)}
                    className='w-9 h-9 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl flex items-center justify-center transition-all duration-300 group/btn border border-red-100 hover:border-red-200'
                    title='Delete Product'
                  >
                    <svg className='w-4 h-4 transform group-hover/btn:scale-110' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          }
        </div>

        {list.length === 0 && (
          <div className='text-center py-20 bg-white'>
            <div className='col-span-full'>
              <div className='w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6'>
                <svg className='w-10 h-10 text-orange-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' />
                </svg>
              </div>
              <p className='text-amber-900 text-2xl font-bold mb-2'>No products found</p>
              <p className='text-amber-700/60 font-medium'>Add your first product to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default List