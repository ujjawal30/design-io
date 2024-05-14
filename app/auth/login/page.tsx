import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    <section className="space-y-6">
      <div className="text-gray-300 space-y-4">
        <h3 className="text-lg font-semibold">Login to your account</h3>
        <p className="text-sm">Welcome back!</p>
      </div>

      <LoginForm />

      <p className="text-gray-300 text-sm">
        Don&apos;t have an account?
        <Link href="/auth/register" className="text-primary-purple font-semibold ml-2 cursor-pointer">
          Register Here.
        </Link>
      </p>
    </section>
  );
};

export default LoginPage;
