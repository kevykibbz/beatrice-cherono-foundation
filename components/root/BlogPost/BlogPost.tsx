"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterest,
  FaLinkedinIn,
  FaSearch,
  FaLongArrowAltRight,
} from "react-icons/fa";

const BlogPost = () => {
  return (
    <main className="bg-gray-50">
      {/* Page Header */}
      <div
        className="relative py-20 text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/page-header-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container relative z-10 mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">
            Default With Sidebar
          </h1>
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
              <Link
                href="/blog"
                className="text-gray-600 hover:text-purple-600"
              >
                Blog
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-purple-600">Default With Sidebar</li>
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
                    src="/assets/images/blog/single/1.jpg"
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
                  <div className="prose max-w-none mb-8">
                    <p className="mb-4">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      Phasellus hendrerit. Pellentesque aliquet nibh nec urna.
                      In nisi neque, aliquet vel, dapibus id, mattis vel, nisi.
                      Sed pretium, ligula sollicitudin laoreet viverra, tortor
                      libero sodales leo, eget blandit nunc tortor eu nibh.
                      Nullam mollis. Ut justo. Suspendisse potenti.
                    </p>
                    <p>
                      Sed egestas, ante et vulputate volutpat, eros pede semper
                      est, vitae luctus metus libero eu augue. Morbi purus
                      libero, faucibus adipiscing, commodo quis, gravida id,
                      est. Sed lectus. Praesent elementum hendrerit tortor. Sed
                      semper lorem at felis. Vestibulum volutpat, lacus a{" "}
                      <Link
                        href="#"
                        className="text-purple-600 hover:underline"
                      >
                        ultrices sagittis
                      </Link>
                      , mi neque euismod dui, eu pulvinar nunc sapien ornare
                      nisl. Phasellus pede arcu, dapibus eu, fermentum et,
                      dapibus sed, urna.
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 border-t border-gray-200">
                    {/* Tags */}
                    <div className="text-sm">
                      <span className="text-gray-600">Tags:</span>
                      <Link
                        href="#"
                        className="ml-2 text-purple-600 hover:underline"
                      >
                        photography
                      </Link>
                      <Link
                        href="#"
                        className="ml-2 text-purple-600 hover:underline"
                      >
                        style
                      </Link>
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
                          src="/assets/images/blog/comments/1.jpg"
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
                              November 9, 2018 at 2:19 pm
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
                            Sed pretium, ligula sollicitudin laoreet viverra,
                            tortor libero sodales leo, eget blandit nunc tortor
                            eu nibh. Nullam mollis. Ut justo. Suspendisse
                            potenti.
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
                              src="/assets/images/blog/comments/2.jpg"
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
                                  November 9, 2018 at 2:19 pm
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
                              <p>Morbi interdum mollis sapien. Sed ac risus.</p>
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
                          src="/assets/images/blog/comments/3.jpg"
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
                              November 9, 2018 at 2:19 pm
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
                            Vestibulum volutpat, lacus a ultrices sagittis, mi
                            neque euismod dui, eu pulvinar nunc sapien ornare
                            nisl. Phasellus pede arcu, dapibus eu, fermentum et,
                            dapibus sed, urna.
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
                    className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
                  >
                    <span>POST COMMENT</span>
                    <FaLongArrowAltRight className="ml-2" />
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
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Search in blog"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-purple-600"
                  >
                    <FaSearch />
                  </button>
                </form>
              </div>

              {/* Related Posts */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4">Related Posts</h3>
                <ul className="space-y-4">
                  {[1, 2, 3, 4].map((post) => (
                    <li key={post} className="flex gap-3">
                      <div className="flex-shrink-0">
                        <Image
                          src={`/assets/images/blog/sidebar/post-${post}.jpg`}
                          alt={`Related post ${post}`}
                          width={80}
                          height={80}
                          className="rounded"
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
