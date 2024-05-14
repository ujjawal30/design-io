import { LoaderIcon } from "lucide-react";

const Loader = () => {
  return (
    <main className="w-full h-screen flex justify-center items-center text-primary-purple">
      <div className="flex flex-col gap-4 items-center">
        <LoaderIcon size={56} className="animate-spin" />
        <p className="text-gray-400 text-xl">Loading...</p>
      </div>
    </main>
  );
};

export default Loader;
