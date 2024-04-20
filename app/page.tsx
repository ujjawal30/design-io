import Live from "@/components/liveblocks/Live";

const HomePage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Live>
        <h1 className="text-4xl text-white">HomePage</h1>
      </Live>
    </div>
  );
};

export default HomePage;
