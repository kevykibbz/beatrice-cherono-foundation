import Loader from "@/components/panel/Loader/Loader";


const Loading = () => {
  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center ">
      <Loader/>
    </div>
  );
};

export default Loading;