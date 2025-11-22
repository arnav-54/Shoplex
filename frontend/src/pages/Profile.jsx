import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {
  const { token, backendUrl } = useContext(ShopContext)
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  })
  const [isEditing, setIsEditing] = useState(false)

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
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(backendUrl + '/api/user/update-profile', userData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (response.data.success) {
        toast.success('Profile updated successfully!')
        setIsEditing(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [token])

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl mb-8'>
        <Title text1={'MY'} text2={'PROFILE'} />
      </div>

      <div className='modern-card max-w-md'>
        <form onSubmit={updateProfile} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-amber-800 mb-2'>Name</label>
            <input
              type='text'
              value={userData.name}
              onChange={(e) => setUserData({...userData, name: e.target.value})}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-amber-800 mb-2'>Email</label>
            <input
              type='email'
              value={userData.email}
              disabled
              className='w-full px-4 py-2 border rounded-lg bg-gray-50'
            />
            <p className='text-xs text-gray-500 mt-1'>Email cannot be changed</p>
          </div>

          {isEditing && (
            <div className='flex gap-3'>
              <button type='submit' className='btn-primary'>
                Save Changes
              </button>
              <button
                type='button'
                onClick={() => {
                  setIsEditing(false)
                  fetchUserData()
                }}
                className='btn-secondary'
              >
                Cancel
              </button>
            </div>
          )}
        </form>
        
        {!isEditing && (
          <div className='mt-6'>
            <button
              onClick={() => setIsEditing(true)}
              className='btn-primary'
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile