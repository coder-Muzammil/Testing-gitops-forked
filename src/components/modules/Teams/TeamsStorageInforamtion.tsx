import { BsThreeDotsVertical } from 'react-icons/bs'

const TeamsStorageInforamtion = () => {
  return (
    <>
      {/* Teams Storage */}
      <div className="w-full h-[100px] rounded-3xl items-center justify-between bg-red-100 my-2 flex flex-row">
        <p className="text-2xl font-bold m-4 ">Team 1</p>
        <div className="flex flex-col h-auto w-2/3 items-center just">
          <div className="flex items-center justify-between w-full px-4 font-bold">
            <p>Storage Available</p>
            <p>60%</p>
          </div>
          <div className="w-2/3 h-2 bg-white rounded-full m-4 ">
            <div className="w-1/3 h-2 bg-purple-500 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between w-full px-4 text-sm">
            <p>Admin 1</p>
            <p>10:10:2023</p>
            <p>Total Users</p>
          </div>
        </div>
        <div className="mx-5">
          <BsThreeDotsVertical />
        </div>
      </div>
    </>
  )
}

export default TeamsStorageInforamtion
