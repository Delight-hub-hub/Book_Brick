import React, { useEffect, useState } from 'react'

const AdminBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBookings = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/bookings')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setBookings(data.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete booking #' + id + '?')) return
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      await fetchBookings()
    } catch (err) {
      alert('Delete failed: ' + err.message)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Admin: Bookings</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && (
        <div className="space-y-3">
          {bookings.length === 0 && <div className="text-gray-600">No bookings yet.</div>}
          {bookings.map((b) => (
            <div key={b.id} className="p-3 bg-white rounded shadow flex justify-between items-center">
              <div>
                <div className="font-medium">{b.name} — {b.service}</div>
                <div className="text-sm text-gray-600">{b.email} • {b.date}</div>
              </div>
              <div>
                <button onClick={() => handleDelete(b.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminBookings
