import AddClgDialog from "@/components/AddClgDialog";
import IsRTKLoadingLoader from "@/components/IsRTKLoadingLoader";
import { useGetCollegesQuery } from "@/redux/features/collegeApi";
import { useState } from "react";

const AdmissionPage = () => {
  const [openModal, setOpenModal] = useState(false); 
  const { data, isLoading } = useGetCollegesQuery({ page: 1 });

  if (isLoading) {
    return <IsRTKLoadingLoader />;
  }

  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.colleges?.map(({ name, image, rating }, idx) => (
          <div
            key={idx}
            onClick={() => setOpenModal(true)}
            className="flex items-start gap-2 bg-gray-200 hover:bg-gray-300 rounded-md duration-500 group cursor-pointer"
          >
            <div className="w-[10rem] overflow-hidden rounded-l-md ">
              <img
                src={image}
                alt={name}
                loading="lazy"
                className="w-full h-full group-hover:scale-125 duration-500 rounded-l-md"
              />
            </div>
            <div>
              <h1 className="font-semibold">{name}</h1>
              <p>{rating}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Component */}
          {/* <AddClgModal openModal={openModal} setOpenModal={setOpenModal} /> */}
          <AddClgDialog openModal={openModal} setOpenModal={setOpenModal}  />
    </div>
  );
};

export default AdmissionPage;