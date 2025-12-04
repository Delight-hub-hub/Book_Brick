import React, { useEffect, useState } from 'react'


const STORAGE_KEY = 'bookings'

function startOfMonthDate(year, month) {
  return new Date(year, month, 1)
}


function formatISO(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function buildCalendar(year, month) {
  
  const first = startOfMonthDate(year, month)

  const startDay = first.getDay() // 0-6 (Sun-Sat)

  // Calculate the date for the grid start (previous month's tail)
  const gridStart = new Date(first)
  gridStart.setDate(first.getDate() - startDay)

  const days = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart)
    d.setDate(gridStart.getDate() + i)
    days.push(d)
  }
  return days
}

const BookingCalendar = () => {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [days, setDays] = useState(() => buildCalendar(today.getFullYear(), today.getMonth()))

  const [selectedDate, setSelectedDate] = useState(formatISO(today))

  // Form fields
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [service, setService] = useState('')

  const [reservations, setReservations] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    setDays(buildCalendar(year, month))
  }, [year, month])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setReservations(JSON.parse(stored))
      } catch (e) {
        console.warn('Failed to parse stored bookings', e)
      }
    }
  }, [])

  // Auto-sync locally-saved bookings when online
  useEffect(() => {
    const trySync = async () => {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return
      let items = []
      try {
        items = JSON.parse(stored)
      } catch {
        return
      }

      const localItems = items.filter((it) => it._local)
      if (localItems.length === 0) return

      for (const it of localItems) {
        try {
          const payload = {
            name: it.fullName,
            email: it.email,
            service: it.service,
            date: it.date,
          }
          const res = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
          if (res.ok) {
            // remove this local item
            items = items.filter((x) => x.id !== it.id)
            // add server marker to reservations state
            const data = await res.json()
            setReservations((prev) => [{ id: Date.now(), fullName: payload.name, email: payload.email, service: payload.service, date: payload.date, _server: true, serverResponse: data }, ...prev])
          }
        } catch (err) {
          // stop on first failure
          console.warn('Sync failed for item', it, err)
          break
        }
      }

      // save back remaining items
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      setReservations(items)
    }

    // attempt sync on mount
    trySync()

    // also attempt sync when coming back online
    const onOnline = () => trySync()
    window.addEventListener('online', onOnline)
    return () => window.removeEventListener('online', onOnline)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations))
  }, [reservations])

  const prevMonth = () => {
    const m = month - 1
    if (m < 0) {
      setMonth(11)
      setYear((y) => y - 1)
    } else {
      setMonth(m)
    }
  }

  const nextMonth = () => {
    const m = month + 1
    if (m > 11) {
      setMonth(0)
      setYear((y) => y + 1)
    } else {
      setMonth(m)
    }
  }

  const handleDayClick = (date) => {
    setSelectedDate(formatISO(date))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    if (!fullName.trim() || !email.trim() || !service.trim() || !selectedDate) {
      setMessage('Please complete all fields.')
      return
    }

    // Check for existing reservation on same date and service (simple conflict check)
    const conflict = reservations.find(
      (r) => r.date === selectedDate && r.service === service
    )
    if (conflict) {
      setMessage('That service is already reserved on the selected date.')
      return
    }

    const payload = {
      name: fullName.trim(),
      email: email.trim(),
      service: service.trim(),
      date: selectedDate,
    }

    // Try sending to backend first. If it fails, fallback to localStorage.
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        // server returned an error — fallback to saving locally
        const text = await res.text()
        console.warn('Booking POST failed:', res.status, text)
        throw new Error('Server error')
      }

      const data = await res.json()

      const serverEntry = {
        id: Date.now(),
        fullName: payload.name,
        email: payload.email,
        service: payload.service,
        date: payload.date,
        _server: true,
        serverResponse: data,
      }

      setReservations((prev) => [serverEntry, ...prev])
      setMessage('Reservation saved to server.')

      setFullName('')
      setEmail('')
      setService('')
    } catch (err) {
      // fallback: save to localStorage
      console.warn('Falling back to local storage for reservation:', err)
      const newRes = {
        id: Date.now(),
        fullName: fullName.trim(),
        email: email.trim(),
        service: service.trim(),
        date: selectedDate,
        _local: true,
      }
      setReservations((prev) => [newRes, ...prev])
      setMessage('Reservation saved locally (offline).')

      setFullName('')
      setEmail('')
      setService('')
    }
  }

  const reservationsByDate = reservations.reduce((acc, r) => {
    acc[r.date] = acc[r.date] ? acc[r.date] + 1 : 1
    return acc
  }, {})

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Make a Reservation</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Service</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              >
                <option value="">Select a service</option>
                <option>Consultation</option>
                <option>Room Booking</option>
                <option>Event Reservation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Reserve
            </button>
            <div className="text-sm text-green-600">{message && <span>{message}</span>}</div>
          </div>
        </form>
      </div>

      {/* Calendar */}
      <div className="max-w-3xl mx-auto mt-6 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={prevMonth}
              className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
              aria-label="Previous month"
            >
              &lt;
            </button>
            <div className="text-lg font-medium">
              {new Date(year, month).toLocaleString(undefined, { month: 'long', year: 'numeric' })}
            </div>
            <button
              onClick={nextMonth}
              className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
              aria-label="Next month"
            >
              &gt;
            </button>
          </div>
          <div className="text-sm text-gray-600">Click a date to select it for the form above</div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="text-sm font-medium text-gray-600">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 mt-2">
          {days.map((d) => {
            const iso = formatISO(d)
            const isCurrentMonth = d.getMonth() === month
            const isToday = iso === formatISO(new Date())
            const reservedCount = reservationsByDate[iso] || 0

            return (
              <button
                key={iso}
                onClick={() => handleDayClick(d)}
                className={`p-2 rounded-md text-sm h-14 flex flex-col items-center justify-between w-full focus:outline-none
                  ${isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}
                  ${isToday ? 'ring-2 ring-blue-300' : ''}
                  ${selectedDate === iso ? 'border-2 border-blue-600' : 'border border-transparent'}`}
                title={iso + (reservedCount ? ` - ${reservedCount} reservations` : '')}
              >
                <div className="text-sm">{d.getDate()}</div>
                <div className="text-xs">
                  {reservedCount > 0 && (
                    <span className="inline-block px-1 py-0.5 text-white bg-red-500 rounded-full">{reservedCount}</span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

         <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Upcoming Reservations</h3>
          {reservations.length === 0 ? (
            <div className="text-sm text-gray-600">No reservations yet.</div>
          ) : (
            <ul className="space-y-2 text-sm">
              {reservations.slice(0, 10).map((r) => (
                <li key={r.id} className="flex items-center justify-between bg-gray-50 rounded p-2">
                  <div>
                    <div className="font-medium">{r.fullName}</div>
                    <div className="text-gray-600 text-xs">{r.email} • {r.service}</div>
                  </div>
                  <div className="text-sm font-medium">{r.date}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingCalendar
