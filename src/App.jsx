import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import Hero from './components/hero.jsx'
import Footer from './components/footer.jsx'
import BookingCalendar from './components/BookingCalendar.jsx'
import AdminBookings from './components/AdminBookings.jsx'

const HomePage = () => (
  <div className="min-h-screen bg-gray-100">
    <Hero />
  </div>
)

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book" element={<BookingCalendar />} />
            <Route path="/admin" element={<AdminBookings />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
