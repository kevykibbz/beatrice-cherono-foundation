export default function Volunteer() {
  return (
    <div
      className="relative w-full h-30 md:h-40 lg:h-45 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/carousel-1.jpg')" }}
    >
      {/* Purple Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-purple-500 to-purple-300 opacity-90"></div>

      <div className="relative flex justify-between items-center w-full max-w-6xl px-6">
        {/* Left Text */}
        <h2 className="text-white text-2xl md:text-3xl font-bold max-w-lg">
          Let&apos;s Change The World <br /> With Humanity
        </h2>

        {/* Right Button */}
        <button className="bg-white text-purple-800 border border-purple-800 px-6 py-4 rounded-full cursor-pointer text-sm font-medium shadow-md hover:bg-purple-100">
          Become A Volunteer
        </button>
      </div>
    </div>
  );
}
