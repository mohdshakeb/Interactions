import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col gap-6">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-64 w-full">
            <img 
              src="/images/card-image.jpg" 
              alt="Card Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">Interactive Demo</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Explore interactive web animations and effects built with modern web technologies.
            </p>
            <Link 
              href="/button-demo"
              className="block w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-300 text-center"
            >
              Show
            </Link>
          </div>
        </div>
        
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">Text Animation</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Discover interactive text animations with hover effects.
            </p>
            <Link 
              href="/text-hover"
              className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 text-center"
            >
              View Text Demo
            </Link>
          </div>
        </div>
        
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">Dropdown Menu</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Interactive dropdown menu with smooth animations.
            </p>
            <Link 
              href="/dropdown"
              className="block w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-300 text-center"
            >
              Dropdown Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
