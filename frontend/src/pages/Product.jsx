import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';
import SocialProof from '../components/SocialProof';
import { LucideHeart, LucideMove3d, LucideImage, LucideShoppingBag, LucideStar, LucideMessageSquare } from 'lucide-react';
import ThreeSixtyViewer from '../components/ThreeSixtyViewer';
import axios from 'axios';

const Product = () => {

  const { productId } = useParams();
  console.log('Product page loaded with ID:', productId);
  const { products, currency, addToCart, wishlist, toggleWishlist, formatPrice, backendUrl, token } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [show360, setShow360] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const isWishlisted = wishlist && wishlist.find(item => item && item._id && item._id.toString() === productId?.toString())

  const fetchProductData = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/product/single', { productId });
      if (response.data.success) {
        setProductData(response.data.product);
        setImage(response.data.product.image[0]);
      }
    } catch (error) {
      console.error('Error fetching product detail:', error);
      // Fallback to context products if API fails
      const product = products.find((item) => String(item._id) === String(productId));
      if (product) {
        setProductData(product);
        setImage(product.image[0]);
      }
    }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error('Please login to leave a review');
      return;
    }
    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(backendUrl + '/api/product/review',
        { productId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success('Review added successfully!');
        setComment('');
        fetchProductData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  return productData ? (
    <div className='pt-10 transition-opacity ease-in duration-500 opacity-100 mx-4'>
      {/*----------- Product Data-------------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/*---------- Product Images------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => { setImage(item); setShow360(false); }} src={item} key={index} className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border-2 transition-all ${image === item && !show360 ? 'border-orange-500 rounded-lg p-0.5' : 'border-transparent opacity-80 hover:opacity-100'}`} alt="" />
              ))
            }
            <div
              onClick={() => setShow360(!show360)}
              className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer aspect-square rounded-lg flex flex-col items-center justify-center gap-1 border-2 transition-all ${show360 ? 'border-amber-50 bg-amber-50' : 'border-dashed border-amber-200 hover:border-amber-400'}`}
            >
              <LucideMove3d className={`${show360 ? 'text-amber-600' : 'text-amber-300'}`} />
              <span className='text-[10px] font-bold text-amber-700 uppercase'>360°</span>
            </div>
          </div>
          <div className='w-full sm:w-[80%]'>
            {show360 ? (
              <ThreeSixtyViewer images={productData.threeSixtyImages && productData.threeSixtyImages.length > 0 ? productData.threeSixtyImages : productData.image} />
            ) : (
              <div className='relative group overflow-hidden rounded-2xl border-2 border-orange-100 bg-white'>
                <img className='w-full h-auto transform transition-transform duration-700 group-hover:scale-110' src={image} alt="" />
                <div className='absolute bottom-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-white'>
                  <LucideImage className='text-orange-600' size={20} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='flex-1 modern-card'>
          <h1 className='font-bold text-3xl mt-2 text-amber-800'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-3'>
            <div className='flex gap-1'>
              {[1, 2, 3, 4, 5].map((star) => (
                <LucideStar
                  key={star}
                  size={18}
                  className={star <= Math.round(productData.averageRating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <p className='pl-2 text-amber-700 font-medium'>({productData.reviews?.length || 0} reviews)</p>
          </div>
          <p className='mt-6 text-4xl font-bold text-orange-600'>{currency}{formatPrice(productData.price)}</p>

          {/* Social Proof Real-time data */}
          <SocialProof productId={productData._id} />

          <p className='mt-6 text-amber-700 md:w-4/5 leading-relaxed text-lg'>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8'>
            <p className='font-bold text-amber-800'>
              Select Size
            </p>
            <div className='flex gap-3 flex-wrap'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border-2 py-3 px-6 rounded-xl font-semibold transition-all hover:scale-105 ${item === size
                    ? 'border-orange-500 bg-orange-100 text-orange-700'
                    : 'border-orange-200 bg-orange-50 text-amber-700 hover:border-orange-300'
                    }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className='flex items-center gap-4 mb-6'>
            <button
              onClick={async () => {
                try {
                  if (!size) {
                    toast.error('Please select a size first!');
                    return;
                  }
                  await addToCart(productData._id, size);
                } catch (error) {
                  console.error('Failed to add to cart:', error);
                  toast.error('Failed to add item to cart');
                }
              }}
              className='btn-primary text-lg flex items-center gap-2 flex-1'
            >
              <LucideShoppingBag size={20} />
              Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(productData._id)}
              className={`p-4 rounded-xl border-2 transition-all ${isWishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'bg-orange-50 border-orange-100 text-amber-800 hover:border-orange-300'}`}
            >
              <LucideHeart size={24} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className='bg-orange-50 rounded-xl p-4 mt-6'>
            <h3 className='font-bold text-amber-800 mb-3'>
              Shoplex Promise
            </h3>
            <div className='text-sm text-amber-700 flex flex-col gap-2'>
              <p className='flex items-center gap-2'><svg className='w-4 h-4 text-green-600' fill='currentColor' viewBox='0 0 20 20'><path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' /></svg> 100% Original & quality products</p>
              <p className='flex items-center gap-2'><svg className='w-4 h-4 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' /></svg> Free delivery on orders over ₹500</p>
              <p className='flex items-center gap-2'><svg className='w-4 h-4 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' /></svg> Easy 7-day return policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Description & Review Section ------------- */}
      <div className='mt-12 modern-card'>
        <div className='flex border-b border-orange-200'>
          <button
            onClick={() => setActiveTab('description')}
            className={`px-6 py-3 font-bold transition-all ${activeTab === 'description' ? 'text-amber-800 border-b-2 border-orange-500 bg-orange-50' : 'text-amber-700 hover:bg-orange-50'}`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 font-bold transition-all ${activeTab === 'reviews' ? 'text-amber-800 border-b-2 border-orange-500 bg-orange-50' : 'text-amber-700 hover:bg-orange-50'}`}
          >
            Reviews ({productData.reviews?.length || 0})
          </button>
        </div>

        {activeTab === 'description' ? (
          <div className='flex flex-col gap-4 p-6 text-amber-700 leading-relaxed'>
            <p>Welcome to Shoplex! Our curated collection brings you the finest quality clothing designed for comfort and style. Each piece is carefully selected to ensure premium quality and exceptional value.</p>
            <p>Every product in our Shoplex collection comes with detailed descriptions, high-quality images, and size guides to help you find the perfect fit. We believe in creating a shopping experience that exceeds your expectations!</p>
          </div>
        ) : (
          <div className='p-6'>
            {/* Review Form */}
            <div className='mb-10 bg-orange-50 p-6 rounded-2xl border border-orange-100'>
              <h3 className='text-lg font-bold text-amber-800 mb-4 flex items-center gap-2'>
                <LucideMessageSquare size={20} className='text-orange-600' />
                Leave a Review
              </h3>
              <form onSubmit={handleReviewSubmit} className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-amber-700 mb-1'>Rating</label>
                  <div className='flex gap-2'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type='button'
                        onClick={() => setRating(star)}
                        className='transition-transform hover:scale-125'
                      >
                        <LucideStar
                          size={24}
                          className={star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-amber-700 mb-1'>Comment</label>
                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Share your thoughts about this product...'
                    className='w-full p-4 rounded-xl border border-orange-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all'
                  />
                </div>
                <button
                  disabled={submitting}
                  type='submit'
                  className='btn-primary py-3 px-8'
                >
                  {submitting ? 'Submitting...' : 'Post Review'}
                </button>
              </form>
            </div>

            {/* Review List */}
            <div className='space-y-6'>
              {productData.reviews && productData.reviews.length > 0 ? (
                productData.reviews.map((rev, index) => (
                  <div key={rev.id || index} className='border-b border-orange-100 pb-6 last:border-0'>
                    <div className='flex justify-between items-start mb-2'>
                      <div>
                        <p className='font-bold text-amber-900'>{rev.userName}</p>
                        <div className='flex gap-0.5 mt-1'>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <LucideStar
                              key={star}
                              size={14}
                              className={star <= rev.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                      <span className='text-xs text-amber-600 italic'>
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className='text-amber-800 leading-relaxed'>{rev.comment}</p>
                  </div>
                ))
              ) : (
                <div className='text-center py-10'>
                  <p className='text-amber-600 italic'>No reviews yet. Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* --------- display related products ---------- */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className=' opacity-0'></div>
}

export default Product
