import React, { useEffect, useState } from 'react'
import { getPropertyById } from '../helper/backend_helpers';
import { useQuery } from '../helper/hook/useQuery';

const Detailspage = (props) => {
  const query = useQuery()
  const [loading, setLoading] = useState(true);
  const [property, setproperty] = useState({});
 
console.log("property",property)
  const propertyDetails = async () => {

    const res = await getPropertyById({propertyId:query.get("uid")});
  
    if (res.success) {
      setproperty(res?.Property);
      console.log("data",res)
    } else {
      console.log("Error while fetching property");
    }
  };
    const [imageIndex,setImageIndex]= useState(0);
    const handleNextClick = () =>{
        if (imageIndex <property?.propertyPic?.length - 1) {
          setImageIndex(prevState => prevState +1)
        }
        else {
          setImageIndex(0)
        }
      }
       const handlePrevClick = () => {
          if(imageIndex < 1) {
            setImageIndex(property?.propertyPic?.length - 1)
          }
          else {
            setImageIndex(prevState => prevState -1)
          }
        }
        
  useEffect(() => {
    const handleProperty = async () => {
      setLoading(true);
      await propertyDetails();
      setLoading(false);
    };
    handleProperty();
  }, []);
  return (
    <div className='sm:grid grid-cols-2 bg-emerald-50 px-10  sm:px-5'>
        <div className='pt-11'>
         <ul className='grid leading-loose'>
            <li className='grid grid-cols-2'><div>Seller:</div><div>{property?.Seller}</div></li>
            <li className='grid grid-cols-2'><div>Location:</div><div>{property?.location}</div></li>
            <li className='grid grid-cols-2'><div>Layoutname:</div><div>{property?.layoutName}</div></li>
            <li className='grid grid-cols-2'><div>Landarea:</div><div>{property?.landArea}</div></li>
            <li className='grid grid-cols-2'><div>Facing:</div><div>{property?.facing}</div></li>
            <li className='grid grid-cols-2'><div>Approchroad:</div><div>{property?.approachRoad}</div></li>
            <li className='grid grid-cols-2'><div>Builtarea:</div><div>{property?.builtArea}</div></li>
            <li className='grid grid-cols-2'><div>Bedroom:</div><div>{property?.bedRoom}</div></li>
            <li className='grid grid-cols-2'><div>Floordetails:</div><div>{property?.floorDetails}</div></li>
            <li className='grid grid-cols-2'><div>Status:</div><div>{property?.status}</div></li>
            <li className='grid grid-cols-2'><div>Neartown:</div><div>{property?.nearTown}</div></li>
            <li className='grid grid-cols-2'><div>Costsq:</div><div>{property?.costSq}</div></li>
            <li className='grid grid-cols-2'><div>Facilties:</div><div>{property?.facilities}</div></li>
            <li className='grid grid-cols-2'><div>Askprice:</div><div>{property?.askPrice}</div></li>            
            <li className='grid grid-cols-2'><div>Description:</div><div>{property?.Description}</div></li>
           
         </ul>
         <div className="flex justify-around pt-8">
                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-sans py-2 px-4 rounded " >
              Seller Contact
            </button>   </div>
         
        </div>
        <div className='mr-2 py-'>
          <div className='w-full select-none relative aspect-[1]'>
       {!loading && <img className='w-full aspect-[3/2]' src={property?.propertyPic[imageIndex]}/>}
           <div id='default-carousel' className='absolute w-full   top-1/2 transform-translate-y-1/2 px-3 flex justify-between items-center'data-bs-ride="static">
          <button type="button" className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev >
               <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-blue-500 dark:bg-gray-800 group-hover:bg-emerald-500 dark:group-hover:bg-blue-800 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none" 
               onClick={()=>handlePrevClick()}
               >
                    <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                <span className="hidden" >Previous</span>
            </span>
         </button>
    <button type="button" className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"  data-carousel-next>
        <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-blue-500 dark:bg-gray-800 group-hover:bg-emerald-500 dark:group-hover:bg-blue-800 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"  
        onClick={()=>handleNextClick()}
        >
            <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" ></path></svg>
            <span className="hidden" >Next</span>
        </span>
    </button>
</div>
</div>
        </div>
       
    </div>
  )
}



export default Detailspage