import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { ArrowRight } from "lucide-react";

import authOptions from "@/auth.config";
import { Button } from "@/components/ui/button";
import AccountMenu from "@/components/menus/AccountMenu";
import Avatar from "@/components/liveblocks/users/Avatar";

import snip from "../public/design-snip.png";
import { features, testimonials } from "@/constants/static";

const Homepage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main className="w-full h-screen p-2 rounded-xl overflow-hidden">
      <div className="h-full  rounded-xl overflow-auto ">
        <nav className="sticky top-0 left-0 z-10 flex select-none items-center justify-between gap-4 bg-primary-black text-white rounded-xl px-4 py-2">
          <div className="px-2">
            <Image src="/logo.png" alt="logo" width={144} height={48} />
          </div>

          <div className="flex items-center gap-4 px-2">
            {session ? (
              <AccountMenu id={session.user.id} info={{ name: session.user.name, avatar: session.user.photo }}>
                <div className="bg-primary-grey-200 rounded-xl p-2 cursor-pointer">
                  <Avatar src={session.user.photo} alt={session.user.name} size={36} />
                </div>
              </AccountMenu>
            ) : (
              <>
                <Link href="/auth/login" className="bg-primary-purple px-4 py-2 rounded-lg hover:bg-primary-purple/80">
                  Login
                </Link>
                <Link href="/auth/register" className="bg-primary-purple px-4 py-2 rounded-lg hover:bg-primary-purple/80">
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>

        <section className="relative -top-2">
          <div className="bg-primary-black text-center py-16 space-y-6 h-fit px-4">
            <p className="text-primary-purple text-sm border border-primary-purple w-fit mx-auto py-2 px-4 rounded-full">
              Design together, anywhere.
            </p>

            <h3 className="text-4xl font-semibold text-gray-400">A new standard for</h3>
            <h1 className="text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-purple to-primary-grey-300">
              designing and collaboration
            </h1>

            <p className="text-gray-500 text-lg">The smart collaborative design tool</p>

            <Button asChild className="bg-primary-purple px-4 py-2 rounded-lg hover:bg-primary-purple/80 !mt-16 group/hero">
              {session ? (
                <Link href="/dashboard">
                  Go to dashboard
                  <ArrowRight size={16} className="ml-2 hidden group-hover/hero:inline-block" />
                </Link>
              ) : (
                <Link href="/auth/login">
                  Get started for free
                  <ArrowRight size={16} className="ml-2 hidden group-hover/hero:inline-block" />
                </Link>
              )}
            </Button>
          </div>

          <div className="bg-gradient-to-b from-primary-black to-transparent flex justify-center px-4">
            <Image src={snip} alt="design" className="w-full md:w-4/5 rounded-xl p-2 bg-primary-grey-200 border-2 border-primary-grey-100" />
          </div>
        </section>

        <section id="features" className="mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-gray-400 mb-6">Features</h2>
            <p className="text-lg text-gray-500">Discover the powerful features that make our platform stand out.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-primary-black rounded-xl shadow-md p-8">
                <h3 className="text-xl font-semibold text-gray-400 mb-4">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-400 mb-6">Testimonials</h2>
            <p className="text-lg text-gray-500">See what our users are saying about their experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-primary-black rounded-xl shadow-md p-8">
                <p className="text-gray-500">&rdquo;{testimonial.message}&ldquo;</p>
                <p className="text-gray-400 font-semibold mt-4">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="bg-gradient-to-t from-primary-black to-transparent text-gray-400 py-12 px-4 rounded-xl">
          <div className="mx-auto space-y-8 px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <Image src="/logo.png" alt="logo" width={144} height={48} />
                <p className="text-gray-400">Design together, anywhere.</p>
              </div>
              <div>
                <nav className="flex flex-wrap justify-center md:justify-end">
                  <Link href="#features" className="text-gray-400 hover:text-white mr-4">
                    Features
                  </Link>
                  <Link href="#testimonials" className="text-gray-400 hover:text-white mr-4">
                    Testimonials
                  </Link>
                </nav>
              </div>
            </div>
            <div className="from-primary-black border-t-2 border-t-gray-700 pt-8">
              <p className="text-center text-gray-400">© {new Date().getFullYear()} design.io. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default Homepage;
