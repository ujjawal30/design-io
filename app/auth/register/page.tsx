import RegisterForm from "@/components/forms/RegisterForm";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <section className="space-y-6">
      <div className="text-gray-300 space-y-4">
        <h3 className="text-lg font-semibold">Create your account</h3>
        <p className="text-sm">
          Welcome to <strong>design.io</strong>
        </p>
      </div>

      <RegisterForm />

      <p className="text-gray-300 text-sm">
        Already have an account?
        <Link
          href="/auth/login"
          className="text-primary-purple font-semibold ml-2 cursor-pointer"
        >
          Login Here.
        </Link>
      </p>
    </section>
  );
};

export default RegisterPage;
