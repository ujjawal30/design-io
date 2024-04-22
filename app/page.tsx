import LiveContainer from "@/components/liveblocks/LiveContainer";
import Navbar from "@/components/shared/Navbar";

const HomePage = () => {
  return (
    <main className="h-screen w-full overflow-hidden flex flex-col">
      <Navbar />

      <section className="flex flex-1 h-full flex-row">
        <LiveContainer>
          <h1 className="text-4xl text-white">HomePage</h1>
        </LiveContainer>
      </section>
    </main>
  );
};

export default HomePage;
