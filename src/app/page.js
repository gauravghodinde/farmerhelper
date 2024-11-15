import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <FarmerPlatformLandingPage/>
    </>
  );
}


const FarmerPlatformLandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <header className="bg-white shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link legacyBehavior href="/">
                <a className="text-indigo-600 font-bold text-2xl">Farmer Platform</a>
              </Link>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  // stroke-width="2"
                  // stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    // stroke-linecap="round"
                    // stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <Link legacyBehavior href="/government-schemes">
                  <a className="text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Government Schemes
                  </a>
                </Link>
                <Link legacyBehavior href="/crop-insurance">
                  <a className="text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Crop Insurance
                  </a>
                </Link>
                <Link legacyBehavior href="/crop-prediction">
                  <a className="text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Crop Prediction
                  </a>
                </Link>
                <Link legacyBehavior href="/disease-detection">
                  <a className="text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Disease Detection
                  </a>
                </Link>
                <Link legacyBehavior href="/cyclone-warning">
                  <a className="text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Cyclone Warning
                  </a>
                </Link>
                <Link legacyBehavior href="/multilingual-support">
                  <a className="text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Multilingual Support
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link legacyBehavior href="/government-schemes">
              <a className="text-gray-900 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Government Schemes
              </a>
            </Link>
            <Link legacyBehavior href="/crop-insurance">
              <a className="text-gray-900 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Crop Insurance
              </a>
            </Link>
            <Link legacyBehavior href="/crop-prediction">
              <a className="text-gray-900 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Crop Prediction
              </a>
            </Link>
            <Link legacyBehavior   href="/disease-detection">
              <a className="text-gray-900 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Disease Detection
              </a>
            </Link>
            <Link legacyBehavior  href="/cyclone-warning">
              <a className="text-gray-900 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Cyclone Warning
              </a>
            </Link>
            <Link legacyBehavior href="/multilingual-support">
              <a className="text-gray-900 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Multilingual Support
              </a>
            </Link>
          </div>
        </div>
      </header>

      <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div className="sm:text-center lg:text-left">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Empower Your Farm</span>
            <span className="block text-indigo-600 xl:inline">with Farmer Platform</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Unlock a suite of cutting-edge tools to maximize your farming potential. Explore government schemes, access crop insurance, predict optimal crops, detect diseases, and more.
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <Link legacyBehavior href="/get-started">
                <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  Get Started
                </a>
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Link legacyBehavior href="/learn-more">
                <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                  Learn More
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Government Schemes</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                // stroke="currentColor"
              >
                <path
                  // stroke-linecap="round"
                  // stroke-linejoin="round"
                  // stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="mt-2 text-gray-500">Explore and apply for government schemes for farmers.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Crop Insurance</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                // stroke="currentColor"
              >
                <path
                  // stroke-linecap="round"
                  // stroke-linejoin="round"
                  // stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="mt-2 text-gray-500">Access and apply for crop insurance schemes.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Crop Prediction</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                // stroke="currentColor"
              >
                <path
                  // stroke-linecap="round"
                  // stroke-linejoin="round"
                  // stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="mt-2 text-gray-500">Predict optimal crops based on soil, weather, and more.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Disease Detection</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                // stroke="currentColor"
              >
                <path
                  // stroke-linecap="round"
                  // stroke-linejoin="round"
                  // stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="mt-2 text-gray-500">Detect crop diseases and get fertilizer suggestions.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Cyclone Warning</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                // stroke="currentColor"
              >
                <path
                  // stroke-linecap="round"
                  // stroke-linejoin="round"
                  // stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="mt-2 text-gray-500">Get alerts for upcoming cyclones.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Multilingual Support</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                // stroke="currentColor"
              >
                <path
                  // stroke-linecap="round"
                  // stroke-linejoin="round"
                  // stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="mt-2 text-gray-500">Access the platform in multiple languages.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

