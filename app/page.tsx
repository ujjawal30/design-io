import LiveContainer from "@/components/liveblocks/LiveContainer";

const HomePage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <LiveContainer>
        <h1 className="text-4xl text-white">HomePage</h1>
      </LiveContainer>
    </div>
  );
};

export default HomePage;
