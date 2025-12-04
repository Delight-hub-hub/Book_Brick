import React from 'react'
import { Link } from 'react-router-dom'
import facilities from '../assets/facilities.jpg'

const Hero = () => {
    return (
        <section
            className="w-full h-[500px] bg-cover bg-center relative"
            style={{
                // Default background image. Replace `/hero-bg.jpg` with your own image
                // by placing it in the `public/` folder; Vite serves files from public at the root.
                backgroundImage: "url('/hero-bg.jpg')",
            }}
        >
            {/* Semi-transparent overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30" />

            <div className="relative z-10 container mx-auto h-full px-4 flex items-center">
                <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Book Better Stays & Experiences
                    </h1>
                    <p className="mt-3 text-lg text-gray-100/90">
                        Quick reservation system for events, stays, and tours. Manage bookings with ease.
                    </p>

                    <div className="mt-6 flex gap-3 items-center">
                        <Link
                            to="/book"
                            className="inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
                        >
                            Book Now
                        </Link>
                        <a
                            href="/learn-more"
                            className="inline-block px-5 py-2 bg-white/20 hover:bg-white/30 text-white rounded-md font-medium"
                        >
                            Learn more
                        </a>
                    </div>
                </div>
                {/* Optional: a visual on the right side for large screens (place /hero-person.jpg in public) */}
                <div className="hidden lg:block ml-auto">
                    <img
                        src={brick}
                        alt="Person holding booking receipt"
                        className="w-[320px] h-80 rounded-xl object-cover shadow-lg border-4 border-white/30"
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero