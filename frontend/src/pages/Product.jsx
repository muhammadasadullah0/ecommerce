import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProdcuts from '../components/RelatedProdcuts'

const Product = () => {
  const {productId} = useParams()
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] =useState('')

  const fetchProductsData = async() =>{
    products.map((item)=>{
      if(item._id === productId){
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(()=>{
    fetchProductsData()
  },[productId])

  return productData ?(
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Products Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
      {/* Products Images */}
      <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
        <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
          {
          productData.image.map((item, index)=>(
            <img onClick={()=>setImage(item)} key={index} src={item} alt="" className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" />
          ))
          }
        </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto " />
          </div>
      </div>
      {/* Products Details */}
          <div className="flex-1">
            <h1 className='font-medium text-2xl mt-2'> {productData.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_dull_icon} alt="" className='w-3 5' />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {
                  productData.sizes.map((item,index)=>(
                    <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500': '' }`} key={index}>{item}</button>
                  ))
                }
              </div>
            </div>
            <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 '>ADD TO CART</button>
            <hr  className='mt-8 sm:w-4/5'/>
            <div className="text-sm text-gray-500 mt-4 flex flex-col gap-1">
              <p>100% Original Product</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and excahnge policy within 7 days.</p>
            </div>
         </div>
      </div>
      {/* Description & Review Section */}
      <div className='mt-20'>
          <div className="flex">
            <b className="border px-5 py-3 text-sm"> Description</b>
            <b className="border px-5 py-3 text-sm"> Reviews (122)</b>
          </div>
          <div className="flex flex-col gap-4 border px-6 text-sm text-gray-500">
            <p>An e-ecommerce website is an online platform that facilitates the buying and selling of products or service over the internet. It serves as a vitual marketplace where business and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce website have gained immense popularity due to their convenience,accessibility, and the global reach they offer.</p>
            <p>E-commerce operates through different models, such as Business-to-Consumer (B2C), Business-to-Business (B2B), Consumer-to-Consumer (C2C), and Consumer-to-Business (C2B).</p>    
          </div>
      </div>
      {/* Display related Products */}
        <RelatedProdcuts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ): <div className="opacity-0"></div>
}

export default Product