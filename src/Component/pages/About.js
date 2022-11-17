import React from 'react'
import image from '../assets/images/9.webp'
import Feedbackpage from './Feedbackpage'

const Aboutus = () => {
  return (
    <div className='bg-gray-100 '>
    <div className='bg-gray-500 flex items-center justify-center flex-wrap font-bold text-2xl py-5 px-5'>
      About Us
      </div>
      <div className='px-20 py-5 leading-loose'>
        <img className='h-96 drop-shadow-xl py-5 rounded-md ' src= {image}/>
        <div className='text-4xl font-bold py-3'>
        <p>Business Background </p>
        </div>
        <p className='font-sans  font-normal'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries, 
         but also the leap into electronic typesetting, remaining essentially unchanged.
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing softw
         are like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <div className='text-4xl font-bold py-3'>
        <p>Company Profile </p>
        </div>
        <p className='font-sans  font-normal'>Contrary to popular belief, Lorem Ipsum is not simply random text. 
        It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
         a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,
          from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
           Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, 
           written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 
           "Lorem ipsum dolor sit amet..",</p>
        
        <p className='font-sans font-normal py-3'>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
         Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, 
         accompanied by English versions from the 1914 translation by H. Rackham.</p>


      </div>
     <Feedbackpage/>
    </div>
  )
}

export default Aboutus