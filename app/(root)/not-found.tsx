import Link from "next/link";
import Header from "@/components/root/Header/Header";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <>
     <Header title="404 Error"/>
     <div className="py-20 animate-fade-in animation-delay-100">
      <div className="container mx-auto text-center">
        <div className="flex justify-center">
          <div className="w-full lg:w-1/2">
            <ExclamationTriangleIcon className="mx-auto h-20 w-20 text-purple-500" />
            <h1 className="text-8xl font-bold text-gray-800">404</h1>
            <h1 className="text-4xl font-semibold text-gray-800 mb-4">Page Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">
              We’re sorry, the page you have looked for does not exist in our website! Maybe go to our home page or try to use a search?
            </p>
            <Link
              href="/"
              className="inline-flex items-center border border-purple-500 text-purple-500 px-6 py-3 rounded-full hover:bg-purple-500 hover:text-white transition duration-300"
            >
              Go Back To Home
              <span className="ml-2 p-1 bg-purple-500 text-white rounded-full">
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
