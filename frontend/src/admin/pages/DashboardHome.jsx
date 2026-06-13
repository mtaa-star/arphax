import React from 'react'
import { Link } from 'react-router-dom'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const BOOKING_COLORS = { pending: '#FBBF24', confirmed: '#60A5FA', in_progress: '#A78BFA', completed: '#34D399', cancelled: '#F87171' }

function StatCard({ icon, label, value, sub, color = 'text-gold' }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
          <i className={`${icon} text-gold text-lg`}></i>
        </div>
        <span className={`font-bebas text-4xl leading-none ${color}`}>{value}</span>
      </div>
      <div className="text-white text-sm font-medium">{label}</div>
      {sub && <div className="text-gray-500 text-xs mt-1">{sub}</div>}
    </div>
  )
}

export default function DashboardHome({ stats, loading }) {
  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-gray-500 text-sm">Loading dashboard...</div>
    </div>
  )
  if (!stats) return null

  const bookingChartData = [
    { name: 'Pending', value: stats.pending_bookings, color: BOOKING_COLORS.pending },
    { name: 'In Progress', value: stats.in_progress_bookings, color: BOOKING_COLORS.in_progress },
    { name: 'Completed', value: stats.total_bookings - stats.pending_bookings - stats.in_progress_bookings, color: BOOKING_COLORS.completed },
  ].filter(d => d.value > 0)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-bebas text-4xl tracking-wide">Dashboard</h1>
        <p className="text-gray-500 text-xs mt-1">Welcome back, {stats.username || 'Admin'}. Here's what's happening.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="fi fi-rr-laptop" label="Total Products" value={stats.total_products} sub="In catalogue" />
        <StatCard icon="fi fi-rr-document" label="Blog Posts" value={stats.total_blog_posts} sub="Published" />
        <StatCard icon="fi fi-rr-tools" label="Repair Bookings" value={stats.total_bookings} sub={`${stats.pending_bookings} pending`} color="text-yellow-400" />
        <StatCard icon="fi fi-rr-envelope" label="Messages" value={stats.total_messages} sub={`${stats.unread_messages} unread`} color={stats.unread_messages > 0 ? 'text-red-400' : 'text-gold'} />
      </div>

      {/* Charts + Recent Bookings */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card p-5">
          <h2 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
            <i className="fi fi-rr-chart-pie text-gold"></i> Booking Status
          </h2>
          {bookingChartData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={bookingChartData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                    {bookingChartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v, n) => [v, n]} contentStyle={{ background: '#111', border: '1px solid #333', fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 mt-2">
                {bookingChartData.map(d => (
                  <div key={d.name} className="flex items-center gap-1.5 text-xs text-gray-400">
                    <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                    {d.name} ({d.value})
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-40 flex items-center justify-center text-gray-600 text-sm">No bookings yet</div>
          )}
        </div>

        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-white flex items-center gap-2">
              <i className="fi fi-rr-tools text-gold"></i> Recent Bookings
            </h2>
            <Link to="/admin/bookings" className="text-gold text-xs hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {stats.recent_bookings?.length > 0 ? stats.recent_bookings.map(b => (
              <div key={b.id} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                <div>
                  <div className="text-sm text-white">{b.full_name}</div>
                  <div className="text-xs text-gray-500">{b.brand} {b.model} · {b.phone}</div>
                </div>
                <span className={`badge-${b.status} capitalize`}>{b.status_display}</span>
              </div>
            )) : <div className="text-gray-600 text-sm">No bookings yet</div>}
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-white flex items-center gap-2">
            <i className="fi fi-rr-envelope text-gold"></i> Recent Messages
          </h2>
          <Link to="/admin/messages" className="text-gold text-xs hover:underline">View all →</Link>
        </div>
        <div className="space-y-3">
          {stats.recent_messages?.length > 0 ? stats.recent_messages.map(m => (
            <div key={m.id} className={`flex items-start gap-3 p-3 border-l-2 ${m.is_read ? 'border-gray-800 opacity-60' : 'border-gold bg-gold/5'}`}>
              <i className={`fi fi-rr-envelope text-lg mt-0.5 ${m.is_read ? 'text-gray-600' : 'text-gold'}`}></i>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white font-medium">{m.name}</span>
                  {!m.is_read && <span className="bg-gold text-black text-xs px-1.5 py-0.5 font-medium">NEW</span>}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{m.email}</div>
                <div className="text-xs text-gray-400 mt-1 truncate">{m.message}</div>
              </div>
            </div>
          )) : <div className="text-gray-600 text-sm">No messages yet</div>}
        </div>
      </div>
    </div>
  )
}