import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Product = () => {

  const { productId } = useParams();
  const { products, currency ,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size,setSize] = useState('')

  const fetchProductData = async () => {
    if (!products || products.length === 0 || !productId) {
      return;
    }
    
    // Optimized product finding with early return
    const product = products.find((item) => String(item._id) === String(productId));
    
    if (product) {
      if (product.image && Array.isArray(product.image) && product.image.length > 0) {
        setProductData(product);
        setImage(product.image[0]);
      } else {
        console.error('Product found but missing valid image data:', productId);
        setProductData(null);
      }
    } else {
      console.error('Product not found:', productId);
      setProductData(null);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, [productId,products])

  return productData ? (
    <div className='pt-10 transition-opacity ease-in duration-500 opacity-100 mx-4'>
      {/*----------- Product Data-------------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/*---------- Product Images------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                productData.image.map((item,index)=>(
                  <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
                ))
              }
          </div>
          <div className='w-full sm:w-[80%]'>
              <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='flex-1 modern-card'>
          <h1 className='font-bold text-3xl mt-2 text-amber-800'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-3'>
              <div className='flex gap-1'>
                <span className='text-yellow-400 text-lg'>⭐⭐⭐⭐</span>
                <span className='text-gray-300 text-lg'>⭐</span>
              </div>
              <p className='pl-2 text-amber-700 font-medium'>(122 reviews)</p>
          </div>
          <p className='mt-6 text-4xl font-bold text-orange-600'>{currency}{productData.price}</p>
          <p className='mt-6 text-amber-700 md:w-4/5 leading-relaxed text-lg'>{productData.description}</p>
          
          <div className='flex flex-col gap-4 my-8'>
              <p className='font-bold text-amber-800'>
                Select Size
              </p>
              <div className='flex gap-3 flex-wrap'>
                {productData.sizes.map((item,index)=>(
                  <button 
                    onClick={()=>setSize(item)} 
                    className={`border-2 py-3 px-6 rounded-xl font-semibold transition-all hover:scale-105 ${
                      item === size 
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
          
          <button 
            onClick={async ()=>{
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
            className='btn-primary text-lg flex items-center gap-2 mb-6'
          >
            Add to Cart
          </button>
          
          <div className='bg-orange-50 rounded-xl p-4 mt-6'>
            <h3 className='font-bold text-amber-800 mb-3'>
              Shoplex Promise
            </h3>
            <div className='text-sm text-amber-700 flex flex-col gap-2'>
              <p className='flex items-center gap-2'><svg className='w-4 h-4 text-green-600' fill='currentColor' viewBox='0 0 20 20'><path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' /></svg> 100% Original & quality products</p>
              <p className='flex items-center gap-2'><svg className='w-4 h-4 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' /></svg> Free delivery on orders over $50</p>
              <p className='flex items-center gap-2'><svg className='w-4 h-4 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' /></svg> Easy 7-day return policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Description & Review Section ------------- */}
      <div className='mt-12 modern-card'>
        <div className='flex border-b border-orange-200'>
          <button className='px-6 py-3 font-bold text-amber-800 border-b-2 border-orange-500 bg-orange-50'>
            Description
          </button>
          <button className='px-6 py-3 font-semibold text-amber-700 hover:bg-orange-50 transition-colors'>
            Reviews (122)
          </button>
        </div>
        <div className='flex flex-col gap-4 p-6 text-amber-700 leading-relaxed'>
          <p>Welcome to Shoplex! Our curated collection brings you the finest quality clothing designed for comfort and style. Each piece is carefully selected to ensure premium quality and exceptional value.</p>
          <p>Every product in our Shoplex collection comes with detailed descriptions, high-quality images, and size guides to help you find the perfect fit. We believe in creating a shopping experience that exceeds your expectations!</p>
        </div>
      </div>

      {/* --------- display related products ---------- */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className=' opacity-0'></div>
}

export default Product
