"use client";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterest,
  FaLinkedinIn,
  FaSearch,
} from "react-icons/fa";

const BlogPost = () => {
  return (
    <main className="bg-gray-50">
      {/* Page Header */}
      <div
        className="relative py-20 text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/carousel-1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container relative z-10 mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">Blog Post</h1>
          <p className="text-lg text-white/80">Single Post</p>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <nav className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-purple-600">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-purple-600">
                Blog
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-purple-600">Single Post</li>
          </ol>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Blog Content */}
            <div className="lg:w-3/4">
              <article className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Featured Image */}
                <figure className="relative h-96 w-full">
                  <Image
                    src="/images/carousel-2.jpg"
                    alt="Blog post image"
                    fill
                    className="object-cover"
                  />
                </figure>

                {/* Blog Content */}
                <div className="p-6 md:p-8">
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center text-sm text-gray-500 gap-3 mb-4">
                    <span>
                      by{" "}
                      <Link
                        href="#"
                        className="text-purple-600 hover:underline"
                      >
                        John Doe
                      </Link>
                    </span>
                    <span>|</span>
                    <Link href="#" className="hover:underline">
                      Nov 22, 2018
                    </Link>
                    <span>|</span>
                    <Link href="#" className="hover:underline">
                      2 Comments
                    </Link>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Cras ornare tristique elit.
                  </h2>

                  {/* Categories */}
                  <div className="mb-6 text-sm">
                    in{" "}
                    <Link href="#" className="text-purple-600 hover:underline">
                      Lifestyle
                    </Link>
                    ,
                    <Link href="#" className="text-purple-600 hover:underline">
                      {" "}
                      Shopping
                    </Link>
                  </div>

                  {/* Content */}
                  <div className="prose prose-lg max-w-none mb-8 text-gray-700 dark:text-gray-300">
                    <p className="mb-6 leading-relaxed">
                      At the Beatrice Cherono Foundation, we believe education
                      is the cornerstone of community development. Our programs
                      in Kipkelion West Sub-County have provided scholarships to
                      250 students this year alone, ensuring children from
                      underprivileged backgrounds can access quality education.
                      We partner with local schools to improve infrastructure
                      while training teachers in modern pedagogical approaches.
                    </p>

                    <p className="mb-6 leading-relaxed">
                      Beyond the classroom, we&apos;ve established community health
                      initiatives that have conducted over 1,200 free medical
                      screenings in the past six months. Our mobile clinics
                      reach remote areas where healthcare access is limited,
                      providing vital services including vaccinations, maternal
                      health checkups, and nutritional support for children
                      under five.
                    </p>

                    <p className="leading-relaxed">
                      Environmental sustainability forms our third pillar -
                      we&apos;ve planted 5,000 indigenous trees across seven wards
                      through our{" "}
                      <Link
                        href="/programs/green-future"
                        className="text-purple-600 hover:text-purple-800 dark:hover:text-purple-400 hover:underline font-medium transition-colors"
                      >
                        Green Future Initiative
                      </Link>
                      . This program not only combats climate change but also
                      creates economic opportunities through agroforestry
                      training for local farmers.
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 border-t border-gray-200">
                    {/* Tags */}
                    <div className="text-sm">
                      <div className="mt-6 flex justify-center items-center">
                        <span className="text-gray-600 mr-2">Tags:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {[
                            { name: "Education", href: "/programs/education" },
                            {
                              name: "Healthcare",
                              href: "/programs/healthcare",
                            },
                            {
                              name: "Environment",
                              href: "/programs/environment",
                            },
                            {
                              name: "Women Empowerment",
                              href: "/programs/women-empowerment",
                            },
                            {
                              name: "Community Development",
                              href: "/programs/community",
                            },
                          ].map((tag) => (
                            <Link
                              key={tag.name}
                              href={tag.href}
                              className="inline-flex items-center px-3 py-2 text-xs font-medium rounded-full bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors"
                            >
                              {tag.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Social Sharing */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">
                        Share this post:
                      </span>
                      <div className="flex gap-2">
                        <Link
                          href="#"
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-600 hover:text-white"
                        >
                          <FaFacebookF size={14} />
                        </Link>
                        <Link
                          href="#"
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-600 hover:text-white"
                        >
                          <FaTwitter size={14} />
                        </Link>
                        <Link
                          href="#"
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-600 hover:text-white"
                        >
                          <FaPinterest size={14} />
                        </Link>
                        <Link
                          href="#"
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-600 hover:text-white"
                        >
                          <FaLinkedinIn size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Comments Section */}
              <div className="mt-12 bg-white rounded-lg shadow-md p-6 md:p-8">
  <h3 className="text-xl font-bold mb-6">3 Comments</h3>

  <ul className="space-y-6">
    {/* Comment 1 */}
    <li>
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <Image
            src="/images/client-1.jpg"
            alt="Jimmy Pearson"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-bold">
                <Link href="#">Jimmy Pearson</Link>
              </h4>
              <span className="text-sm text-gray-500">
                November 9, 2023 at 2:19 pm
              </span>
            </div>
            <Link href="#" className="text-sm text-purple-600 hover:underline">
              Reply
            </Link>
          </div>
          <div className="text-gray-700">
            <p>
              This article was really insightful! I had no idea about some of these strategies. 
              Thanks for sharing such valuable information.
            </p>
          </div>
        </div>
      </div>

      {/* Nested Comment */}
      <ul className="mt-6 pl-4 md:pl-12">
        <li>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Image
                src="/images/client-2.jpg"
                alt="Lena Knight"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold">
                    <Link href="#">Lena Knight</Link>
                  </h4>
                  <span className="text-sm text-gray-500">
                    November 9, 2023 at 3:00 pm
                  </span>
                </div>
                <Link
                  href="#"
                  className="text-sm text-purple-600 hover:underline"
                >
                  Reply
                </Link>
              </div>
              <div className="text-gray-700">
                <p>
                  I totally agree, Jimmy! I tried one of the techniques mentioned, and it 
                  really helped me improve my workflow.
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </li>

    {/* Comment 2 */}
    <li>
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <Image
            src="/images/client-3.jpg"
            alt="Johnathan Castillo"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-bold">
                <Link href="#">Johnathan Castillo</Link>
              </h4>
              <span className="text-sm text-gray-500">
                November 10, 2023 at 10:45 am
              </span>
            </div>
            <Link href="#" className="text-sm text-purple-600 hover:underline">
              Reply
            </Link>
          </div>
          <div className="text-gray-700">
            <p>
              Great read! I appreciate how well-researched this was. Looking 
              forward to more content like this.
            </p>
          </div>
        </div>
      </div>
    </li>
  </ul>
</div>


              {/* Comment Form */}
              <div className="mt-8 bg-white rounded-lg shadow-md p-6 md:p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Leave A Reply</h3>
                  <p className="text-gray-600">
                    Your email address will not be published. Required fields
                    are marked *
                  </p>
                </div>

                <form className="space-y-4">
                  <div>
                    <label htmlFor="reply-message" className="sr-only">
                      Comment
                    </label>
                    <textarea
                      id="reply-message"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Comment *"
                      required
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="reply-name" className="sr-only">
                        Name
                      </label>
                      <input
                        type="text"
                        id="reply-name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Name *"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="reply-email" className="sr-only">
                        Email
                      </label>
                      <input
                        type="email"
                        id="reply-email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Email *"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="cursor-pointer rounded-full inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600  hover:bg-purple-600 hover:text-white transition-colors"
                  >
                    <span>POST COMMENT</span>
                    <ChevronRightIcon className="ml-2 w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-1/4 space-y-8">
              {/* Search Widget */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4">Search</h3>
                <form className="relative">
                  <label htmlFor="ws" className="sr-only">
                    Search in blog
                  </label>
                  <input
                    type="search"
                    id="ws"
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Search in blog"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-4 text-gray-400 hover:text-purple-600"
                  >
                    <FaSearch />
                  </button>
                </form>
              </div>

              {/* Related Posts */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4">Related Posts</h3>
                <ul className="space-y-4">
                  {[1, 2, 3, 4].map((post, index) => (
                    <li key={post} className="flex gap-3">
                      <div
                        className="flex-shrink-0 relative"
                        style={{ width: "80px", height: "80px" }}
                      >
                        <Image
                          src={`/images/carousel-${index + 1}.jpg`}
                          alt={`Related post ${index + 1}`}
                          fill
                          className="rounded object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">
                          Nov {22 - post}, 2018
                        </span>
                        <h4 className="font-medium hover:text-purple-600">
                          <Link href="#">
                            Aliquam tincidunt mauris eurisus.
                          </Link>
                        </h4>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags Widget */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4">Browse Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "fashion",
                    "style",
                    "women",
                    "photography",
                    "travel",
                    "shopping",
                    "hobbies",
                  ].map((tag) => (
                    <Link
                      key={tag}
                      href="#"
                      className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-purple-600 hover:text-white rounded-full transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogPost;
