import React from "react";

const FeaturedProperty = () => {
  const Property = [
    {
      image: require("../assets/images/house3.jpg"),
      albumId: "seller",
      id: 2,
      title: "reprehenderit est deserunt velit ipsam",
      url: "https://via.placeholder.com/600/771796",
      thumbnailUrl: "https://via.placeholder.com/150/771796",
    },
    {
      image: require("../assets/images/house2.jpg"),
      albumId: "seller",
      id: 2,
      title: "reprehenderit est deserunt velit ipsam",
      url: "https://via.placeholder.com/600/771796",
      thumbnailUrl: "https://via.placeholder.com/150/771796",
    },
    {
      image: require("../assets/images/house4.webp"),
      albumId: "seller",
      id: 2,
      title: "reprehenderit est deserunt velit ipsam",
      url: "https://via.placeholder.com/600/771796",
      thumbnailUrl: "https://via.placeholder.com/150/771796",
    },
    {
      image: require("../assets/images/house5.webp"),
      albumId: "seller",
      id: 2,
      title: "reprehenderit est deserunt velit ipsam",
      url: "https://via.placeholder.com/600/771796",
      thumbnailUrl: "https://via.placeholder.com/150/771796",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 auto-rows-fr md:grid-cols-2 xl:grid-cols-3 gap-4  row-span-3">
        {Property.map((pro, i) => (
          <div key={i} className="bg-gray-100  rounded-md drop-shadow-lg">
            <img
              className="w-full aspect-[1] object-cover"
              alt="coimbatore realestate"
              src={pro.image}
            />
            <div className=" font-semibold text-center py-5">
              {" "}
              Details
              <div className="font-sans text-sm  text-left p-5 leading-loose">
                <h5>Title :{pro.albumId}</h5>
                <h6>Askprice :{pro.id}</h6>
                <p>Description :{pro.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperty;
