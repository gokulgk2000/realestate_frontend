import React, { useEffect, useState ,useMemo } from 'react'
import { Breadcrumbs } from '@material-tailwind/react'
import Pagination from '../pagination/Pagination';
import { useQuery } from '../helper/hook/useQuery';
import { getIntrestedPropertyBybuyerId, getIntrestedPropertyById, getIntrestedPropertyByuserId } from '../helper/backend_helpers';


const Intrested = () => { 
  const query = useQuery();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [intrestedData, setIntrestedData] = useState([]);
  const [postsPerPage] = useState(10);
  const [searchText,setSearchText]=useState("")
  const currentUser = JSON.parse(localStorage?.getItem("authUser"));

console.log("intrestedData",intrestedData)

const requestSearch = (searched)=>{
  setSearchText(searched)}

   useEffect(() => {
        const handleFetchingIntrestedProperty = async () => {
          setLoading(true);
          const res = await getIntrestedPropertyBybuyerId ({ 
        _id: currentUser?.userID})
        if(res.success){
          setIntrestedData(res?.Intrested);
          setLoading(false);
        }else{
          console.log("Error in fetching IntrestedData: ", res)
        }
        };
        handleFetchingIntrestedProperty()
        // return () => {}
      }, []);

      // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
  return (
    <div >
<div className=" overflow-x-auto  shadow-md sm:rounded-lg">
<div className="w- flex justify-center items-center mt-2 pb-4  ">
        <input
          type="text"
          placeholder="search"
          name="search"
          className="md:w-96 px-3 py-2 bg-slate-200 rounded-tl-full rounded-bl-full border-0 focus:outline-0"
          onChange={(e) => requestSearch(e.target.value)}
        />
        <button
          type="submit"
          className="px-3 py-2 -ml-1.5 grad-btn text-white rounded-tr-full rounded-br-full"
        >
          Search
        </button>
      </div>
      <Breadcrumbs >
      <a href="/" className="opacity-60">
        Home
      </a>
      <a href="/UserActivties" className="text-rose-700">
        Activities
      </a>
    </Breadcrumbs>
 <div className='md:grid  '>  <table className=" text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr >
                <th scope="col" className="py-3 px-6  text-rose-700">
                   S.No
                </th>
                <th scope="col" className="py-3 px-6  text-rose-700">
                    <div className="flex items-center">
                    Seller
                        <a href="#"></a>
                    </div>
                </th>
                <th scope="col" className="py-3 px-6  text-rose-700">
                    <div className="flex items-center">
                    landArea
                        <a href="#"></a>
                    </div>
                </th>
                <th scope="col" className="py-3 px-6  text-rose-700">
                    <div className="flex items-center">
                    layoutName
                        <a href="#"></a>
                    </div>
                </th>
                <th scope="col" className="py-3 px-6  text-rose-700">
                    <div className="flex items-center">
                    location
                        <a href="#"></a>
                    </div>
                </th>
               
            </tr>
        </thead>
        <tbody>
        {( intrestedData
    //     ?.filter(
    //   (item) =>
    //   item?.facing
    //   .toString()
    //         .toLowerCase()
    //         .includes(searchText.toString().toLowerCase()) ||
    //       item?.location
    //       .toString()
    //       .toLowerCase()
    //       .includes(searchText.toString().toLowerCase()) ||
    //       item?.askPrice
    //       .toString()
    //       .toLowerCase()
    //       .includes(searchText.toString().toLowerCase()) ||
    //       item?.nearTown
    //       .toString()
    //       .toLowerCase()
    //       .includes(searchText.toString().toLowerCase())
         
    // )
    .slice((currentPage -1)*10,(currentPage *10))).map((Data,i)=>(
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {i+1}
                </th>
                <td className="py-4 px-6 capitalize">
                    {Data?.propertyId?.Seller} 
                </td>
                <td className="py-4 px-6">
                {Data?.propertyId?.landArea}
                </td>
                <td className="py-4 px-6 capitalize">
                {Data?.propertyId?.layoutName}
                </td>
                <td className="py-4 px-6">
                {Data?.propertyId?.location}
                </td>
                
            </tr>
            ))}
        </tbody>
    </table>
</div>

<div className='justify-content px-96 mt-2'>
    <nav aria-label="Page navigation example justify-center">
    {/* <Posts posts={currentPosts} /> */}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={intrestedData?.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </nav>
    </div>
    </div> 
    </div>
  )
}

export default Intrested