// components/Navbar.jsx
import Link from "next/link";

const Navbar = () => {
  const navLinks = [
    { title: 'Government Schemes', href: '/government-schemes' },
    { title: 'Crop Insurance', href: '/crop-insurance' },
    { title: 'Crop Prediction', href: '/crop-prediction' },
    { title: 'Disease Detection', href: '/disease-detection' },
    { title: 'Cyclone Warning', href: '/cyclone-warning' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-emerald-600 font-bold text-2xl hover:text-emerald-700 transition-colors">
              GreenGuide
            </Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map(({ title, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-900 hover:bg-emerald-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map(({ title, href }) => (
            <Link
              key={href}
              href={href}
              className="text-gray-900 hover:bg-emerald-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              {title}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;