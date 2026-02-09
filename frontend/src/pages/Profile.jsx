import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'
import { User, Mail, MapPin, CreditCard, Package, Heart, Camera, Loader2, Save, X, Edit2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { token, backendUrl, wishlist } = useContext(ShopContext)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    image: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(false)
  const navigate = useNavigate()

  const fetchUserData = async () => {
    try {
      if (!token) return

      const response = await axios.post(backendUrl + '/api/user/profile', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data.success) {
        setUserData(response.data.user)
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to load profile data')
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('email', userData.email)

      if (image) {
        formData.append('image', image)
      }

      const response = await axios.post(backendUrl + '/api/user/update-profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data.success) {
        toast.success('Profile updated successfully!')
        setUserData(response.data.user)
        setIsEditing(false)
        setImage(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [token])

  return (
    <div className='border-t pt-16 min-h-[80vh]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-12 text-center'>
          <Title text1={'MY'} text2={'PROFILE'} />
          <p className='text-gray-500 mt-2'>Manage your personal information and account settings</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Sidebar - Profile Overview */}
          <div className='lg:col-span-1'>
            <div className='modern-card p-6 flex flex-col items-center text-center sticky top-24'>
              <div className='relative mb-6 group'>
                <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-amber-100 shadow-lg relative'>
                  <img
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : userData.image
                          ? userData.image
                          : `https://ui-avatars.com/api/?name=${userData.name}&background=random&color=fff&size=200`
                    }
                    alt="Profile"
                    className='w-full h-full object-cover'
                  />
                  <label htmlFor="image" className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white z-10'>
                    <Camera className='w-8 h-8' />
                  </label>
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    id="image"
                    hidden
                  />
                </div>
              </div>

              <h2 className='text-2xl font-bold text-gray-800 mb-1'>{userData.name}</h2>
              <p className='text-gray-500 text-sm mb-6'>{userData.email}</p>

              <div className='w-full space-y-3'>
                <button
                  onClick={() => navigate('/orders')}
                  className='w-full flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 text-gray-700 transition-colors border border-transparent hover:border-amber-100'
                >
                  <div className='p-2 bg-amber-100 rounded-lg text-amber-700'>
                    <Package size={20} />
                  </div>
                  <span className='font-medium'>My Orders</span>
                </button>

                <button
                  onClick={() => navigate('/wishlist')}
                  className='w-full flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 text-gray-700 transition-colors border border-transparent hover:border-amber-100'
                >
                  <div className='p-2 bg-pink-100 rounded-lg text-pink-600'>
                    <Heart size={20} />
                  </div>
                  <span className='font-medium flex-1 text-left'>Wishlist</span>
                  {wishlist.length > 0 && (
                    <span className='bg-pink-100 text-pink-600 text-xs font-bold px-2 py-1 rounded-full'>
                      {wishlist.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Edit Profile Form */}
          <div className='lg:col-span-2'>
            <div className='modern-card p-8'>
              <div className='flex justify-between items-center mb-8 border-b border-gray-100 pb-4'>
                <h3 className='text-xl font-bold text-gray-700'>Personal Information</h3>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className='flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium transition-colors'
                  >
                    <Edit2 size={18} />
                    <span>Edit Details</span>
                  </button>
                )}
              </div>

              <form onSubmit={updateProfile} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-600 ml-1'>Display Name</label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <User className='h-5 w-5 text-gray-400' />
                      </div>
                      <input
                        type='text'
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        disabled={!isEditing}
                        className={`block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors outline-none ${!isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-600 ml-1'>Email Address</label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <Mail className='h-5 w-5 text-gray-400' />
                      </div>
                      <input
                        type='email'
                        value={userData.email}
                        disabled
                        className='block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 outline-none cursor-not-allowed'
                      />
                      <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                        <span className='text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-full'>Verified</span>
                      </div>
                    </div>
                    <p className='text-xs text-gray-400 ml-1'>Email address cannot be changed.</p>
                  </div>
                </div>

                {isEditing && (
                  <div className='flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-100 animate-fade-in-up'>
                    <button
                      type='button'
                      onClick={() => {
                        setIsEditing(false)
                        fetchUserData()
                        setImage(false)
                      }}
                      className='px-6 py-2.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-all duration-200 flex items-center gap-2'
                    >
                      <X size={18} />
                      Cancel
                    </button>
                    <button
                      type='submit'
                      disabled={loading}
                      className='px-8 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed'
                    >
                      {loading ? <Loader2 className='w-5 h-5 animate-spin' /> : <Save size={18} />}
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile