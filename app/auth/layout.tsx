import Image from "next/image";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-screen flex items-center justify-center p-10">
      <main className="bg-primary-black w-full sm:w-[512px] p-8 space-y-6 shadow-xl rounded-xl">
        <Image src="/logo.png" alt="logo" width={144} height={48} />
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
