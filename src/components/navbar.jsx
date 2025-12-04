import React from 'react'
import { Link } from 'react-router-dom'
import flag from '../assets/flag.jpg'
import delight from '../assets/delight.png'
// Simple, responsive navigation bar for a booking/reservation system.
// Note: The component uses Tailwind CSS utility classes — if you don't
// have Tailwind configured, the markup will still render but styles won't apply.
// Images (flag and profile) should be placed in the `public/` folder as:
//   /flag-sa.jpg -> South African flag image
//   /profile.jpg -> Profile picture for the account holder

const Navbar = () => {
    return (
        <header className="bg-white border-b shadow-sm">
            <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Left: Logo / brand */}
                <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-gray-800">CENTRO DE CONFERENCIAS</div>
                    <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
                        <Link to="/" className="hover:text-blue-600">Home</Link>
                        <Link to="/book" className="hover:text-blue-600">Bookings</Link>
                        <Link to="/admin" className="hover:text-blue-600">Admin</Link>
                        <a href="/about" className="hover:text-blue-600">About</a>
                    </div>
                </div>

                {/* Right: Flag, auth actions, and profile avatar */}
                <div className="flex items-center gap-3">
                    {/* South African flag (place in public folder) */}
                    <img
                        src={flag}
                        alt="South African Flag"
                        className="w-7 h-7 rounded-sm object-cover"
                        title="South Africa"
                    />

                    {/* Sign in / Sign up buttons — small on desktop, stacked on mobile */}
                    <div className="hidden sm:flex items-center gap-2">
                        <a
                            href="/signin"
                            className="text-sm text-gray-700 hover:text-blue-600"
                        >
                            Sign in
                        </a>
                        <a
                            href="/signup"
                            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                        >
                            Sign up
                        </a>
                    </div>

                    {/* Profile image for the account holder; put `/profile.jpg` into public */}
                    <img
                        src={delight}
                        alt="Account holder"
                        width="36"
                        height="36"
                        className="w-9 h-9 rounded-full border-2 border-gray-200 object-cover"
                    />

                    {/* Mobile menu button (basic icon only) */}
                    <button
                        className="ml-1 inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 sm:hidden"
                        aria-label="Open menu"
                    >
                        <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Navbar


