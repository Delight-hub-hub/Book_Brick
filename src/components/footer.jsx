import React from 'react'
import logo from '../assets/brick_logo.png'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-200">
            <div className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Brand */}
                <div>
                    <div className="flex items-center gap-3">
                        <div className="text-2xl font-bold">CENTRO DE CONFERENCIAS</div>
                        <img src={logo} alt="South Africa" className="w-6 h-4 object-cover rounded-sm" />
                    </div>
                    <p className="mt-3 text-gray-300 text-sm max-w-xs">
                        Fast and reliable booking for stays, events and tours. Designed with simplicity for customers and hosts.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <div className="font-semibold mb-2">Quick Links</div>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li>
                            <a href="/" className="hover:text-white">Home</a>
                        </li>
                        <li>
                            <a href="/bookings" className="hover:text-white">Bookings</a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-white">About</a>
                        </li>
                        <li>
                            <a href="/faq" className="hover:text-white">FAQ</a>
                        </li>
                    </ul>
                </div>

                {/* Support / Contact */}
                <div>
                    <div className="font-semibold mb-2">Support</div>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li>
                            <a href="mailto:support@bookbrick.example" className="hover:text-white">support@centro.com</a>
                        </li>
                        <li>
                            <a href="tel:+27123456789" className="hover:text-white">+27 61 831 2589</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-white">Contact us</a>
                        </li>
                    </ul>
                </div>

                {/* Legal and Social */}
                <div>
                    <div className="font-semibold mb-2">Legal</div>
                    <ul className="space-y-2 text-sm text-gray-300 mb-4">
                        <li>
                            <a href="/terms" className="hover:text-white">Terms & Conditions</a>
                        </li>
                        <li>
                            <a href="/privacy" className="hover:text-white">Privacy Policy</a>
                        </li>
                    </ul>

                    <div className="flex items-center gap-3 mt-2">
                        {/* Social icons are inline SVGs to avoid extra dependencies */}
                        <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-white">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 4.99 3.66 9.12 8.44 9.95v-7.04H7.9v-2.91h2.54V9.79c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.62.77-1.62 1.56v1.87h2.77l-.44 2.91h-2.33V22C18.34 21.19 22 17.06 22 12.07z" />
                            </svg>
                        </a>
                        <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-white">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M22 5.92c-.63.28-1.3.48-2.01.57.72-.43 1.27-1.1 1.53-1.9-.67.4-1.4.68-2.18.84C18.9 4.6 17.79 4 16.54 4c-1.86 0-3.37 1.5-3.37 3.36 0 .26.03.51.09.75-2.8-.14-5.29-1.48-6.96-3.53-.29.5-.46 1.07-.46 1.69 0 1.17.6 2.2 1.52 2.81-.56-.02-1.09-.17-1.55-.43v.04c0 1.62 1.15 2.99 2.67 3.3-.28.07-.57.11-.87.11-.21 0-.42-.02-.62-.06.42 1.32 1.63 2.28 3.06 2.31-1.12.88-2.54 1.4-4.08 1.4-.26 0-.51-.02-.76-.04 1.47.94 3.22 1.48 5.1 1.48 6.12 0 9.46-5.06 9.46-9.46v-.43c.66-.47 1.23-1.06 1.69-1.73-.61.28-1.25.47-1.92.55.69-.42 1.22-1.08 1.48-1.88z" />
                            </svg>
                        </a>
                        <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-white">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 4.5C11.12 8.5 9.5 10.12 9.5 12S11.12 15.5 13 15.5 16.5 13.88 16.5 12 14.88 8.5 12 8.5zm4.5-2.5a1 1 0 110 2 1 1 0 010-2z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 bg-gray-800">
                <div className="container mx-auto px-4 py-3 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} CENTRO DE CONFERENCIAS. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer