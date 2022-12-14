import React, { useEffect, useState ,useMemo } from 'react'
import { Breadcrumbs } from '@material-tailwind/react'
import Pagination from '../pagination/Pagination';
import { allBuyerList, getrequestedByUserId } from '../helper/backend_helpers';
import { Link } from 'react-router-dom';
import { useModal } from '../helper/hook/useModal';
import RequestedModel from "../models/RequestedModel";


const Requested = () => {
    const currentUser = JSON.parse(localStorage?.getItem("authUser"));
  const [loading, setLoading] = useState(false);
    const [requestData, setRequestData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [searchText,setSearchText]=useState("")
  const [modalOpen, setModalOpen] = useModal(false);

const requestData1=[]
const requestSearch = (searched)=>{
  setSearchText(searched)}

  const getAllRequested= async () => {
    setLoading(true);
    const payload = {
        userID: currentUser?.userID
      };
    const res = await getrequestedByUserId(payload
      
        );
    console.log("dsp:",res);
    if (res.success) {
        setRequestData(res.requested);
    }
    setLoading(false);
  };
  useEffect(() => {
    getAllRequested();
  }, []);
console.log("requestData",requestData)
      // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
  return (
    <div >
         {modalOpen && (
        <RequestedModel
          show={modalOpen}
          onCloseClick={()=>setModalOpen(false)}
          currentUser={requestData?._id}
        />
      )}
<div className=" overflow-x-auto  shadow-md sm:rounded-lg">
<div className="md:flex md:justify-around items-center mt-2 pb-4 pl-14">
     <div>   <input
          type="text"
          placeholder="search"
          name="search"
          className="look  px-3 py-2 bg-slate-200 rounded-tl-full rounded-bl-full border-0 focus:outline-0"
          onChange={(e) => requestSearch(e.target.value)}
        />
        <button
          type="submit"
          className="px-3 py-2 -ml-1.5 grad-btn text-white rounded-tr-full rounded-br-full"
        >
          Search
        </button></div>
      <div className='felx justify-center flex-wrap pl-16 pt-3'>
        <button className='md:p-2 font grad-btn '
        onClick={()=>setModalOpen(true)}>New Request</button>
        <p className='text-xs '>Click to Sent a New Request</p>
        </div>
        
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
                      Buyer Name
                        <a href="#"></a>
                    </div>
                </th>
                <th scope="col" className="py-3 px-6  text-rose-700">
                    <div className="flex items-center">
                    facing
                        <a href="#"></a>
                    </div>
                </th>
                <th scope="col" className="py-3 px-6  text-rose-700">
                    <div className="flex items-center">
                    location
                        <a href="#"></a>
                    </div>
                </th>
                <th scope="col" className="py-3 px-6  text-rose-700">
                    <div className="flex items-center">
                    nearTown
                        <a href="#"></a>
                    </div>
                </th>
                <th scope="col" className="py-3 px-6  text-rose-700">
                    <div className="flex items-center">
                    askPrice
                        <a href="#"></a>
                    </div>
                </th>
               
            </tr>
        </thead>
        <tbody>
        {( requestData
        ?.filter(
      (item) =>
      item?.facing
      .toString()
            .toLowerCase()
            .includes(searchText.toString().toLowerCase()) ||
          item?.location
          .toString()
          .toLowerCase()
          .includes(searchText.toString().toLowerCase()) ||
          item?.askPrice
          .toString()
          .toLowerCase()
          .includes(searchText.toString().toLowerCase()) ||
          item?.nearTown
          .toString()
          .toLowerCase()
          .includes(searchText.toString().toLowerCase()) 
         
    )
    .slice((currentPage -1)*10,(currentPage *10))).map((Data,i)=>(
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {i+1}
                </th>
                <td className="py-4 px-6 capitalize">
                    {Data?.regUser?.firstname}
                    {Data?.regUser?.lastname}
                </td>
                <td className="py-4 px-6 capitalize">
                    {Data?.facing}
                </td>
                <td className="py-4 px-6">
                {Data?.location}
                </td>
                <td className="py-4 px-6 capitalize">
                {Data?.nearTown}
                </td>   
                <td className="py-4 px-6">
                {Data?.askPrice}
                </td>
                <td className="py-4 px-6 font-semibold capitalize">

                  {/* <tr>{Data?.propertyId?.layoutName},</tr><tr>{Data?.propertyId?.location}</tr> */}
              
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
        totalPosts={requestData?.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </nav>
    </div>
    </div> 
    </div>
  )
}

export default Requested