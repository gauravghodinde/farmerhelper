import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  return (
    <>
      <Head>
        
        <title>GreenGuide - Empowering Farmers</title>
      </Head>
      <GreenGuideLandingPage />
    </>
  );
}

const GreenGuideLandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-emerald-500">
      <Navbar />
      
      <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div className="sm:text-center lg:text-left">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Empower Your Farm</span>{" "}
            <span className="block text-emerald-900 xl:inline">with GreenGuide</span>
          </h1>
          <p className="mt-3 text-base text-gray-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Unlock a suite of cutting-edge tools to maximize your farming potential. Explore government schemes, access crop insurance, predict optimal crops, detect diseases, and more.
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <Link
                href="/learn-more"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </main>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Government Schemes',
              description: 'Explore and apply for government schemes for farmers.',
              href: '/government-schemes'
            },
            {
              title: 'Crop Insurance',
              description: 'Access and apply for crop insurance schemes.',
              href: '/crop-insurance'
            },
            {
              title: 'Crop Prediction',
              description: 'Predict optimal crops based on soil, weather, and more.',
              href: '/crop-prediction'
            },
            {
              title: 'Disease Detection',
              description: 'Detect crop diseases and get fertilizer suggestions.',
              href: '/disease-detection'
            },
            {
              title: 'Cyclone Warning',
              description: 'Get alerts for upcoming cyclones.',
              href: '/cyclone-warning'
            }
          ].map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105 hover:bg-white"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{card.title}</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="mt-2 text-gray-500">{card.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};