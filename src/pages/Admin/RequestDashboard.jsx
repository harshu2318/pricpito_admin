import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { assets } from "../../assets/assets"
import { toast } from 'react-toastify'

const RequestDashboard = () => {
  const { aToken, backend_url } = useContext(AdminContext)
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(backend_url + '/api/metrics', { headers: { atoken: aToken } })
      setMetrics(data)
    } catch (error) {
      console.error(error)
      toast.error("Failed to load request metrics")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (aToken) {
      fetchMetrics()
      // Refresh metrics every 15 seconds automatically
      const interval = setInterval(fetchMetrics, 15000)
      return () => clearInterval(interval)
    }
  }, [aToken])

  if (loading && !metrics) {
    return <div className='m-5 text-gray-500 font-semibold'>Loading metrics...</div>
  }

  return metrics && (
    <div className='m-5 w-full max-w-4xl'>
      <div className='flex justify-between items-center mb-5'>
        <h1 className='text-2xl font-bold text-gray-800'>Request Performance Dashboard</h1>
        <button 
          onClick={fetchMetrics} 
          className='bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors text-sm font-medium'
        >
          Refresh Data
        </button>
      </div>

      {/* KPI Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        <div className='flex items-center gap-4 bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
          <div className='p-3 bg-blue-50 rounded-full'>
            <img className='w-8 h-8' src={assets.earning_icon} alt="Average response time" />
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{metrics.averageResponseTime} ms</p>
            <p className='text-sm text-gray-500 font-medium'>Avg Response Time</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
          <div className='p-3 bg-purple-50 rounded-full'>
            <img className='w-8 h-8' src={assets.appointments_icon} alt="Total requests" />
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{metrics.totalRequests}</p>
            <p className='text-sm text-gray-500 font-medium'>Total Requests</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
          <div className='p-3 bg-green-50 rounded-full'>
            <img className='w-8 h-8' src={assets.patients_icon} alt="Requests today" />
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{metrics.requestsToday}</p>
            <p className='text-sm text-gray-500 font-medium'>Requests Today</p>
          </div>
        </div>
      </div>

      {/* Endpoint Performance details */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Slowest Request card */}
        <div className='bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden'>
          <div className='bg-red-50 px-5 py-4 border-b border-gray-200 flex items-center gap-2'>
            <span className='w-3 h-3 bg-red-500 rounded-full animate-ping'></span>
            <h3 className='font-semibold text-red-800'>Slowest Request (Max Latency)</h3>
          </div>
          <div className='p-5'>
            {metrics.slowestRequest ? (
              <div className='space-y-3'>
                <div className='flex justify-between items-center border-b border-gray-100 pb-2'>
                  <span className='text-gray-500 font-medium'>HTTP Method:</span>
                  <span className='px-2.5 py-1 bg-red-100 text-red-700 text-xs font-bold rounded'>
                    {metrics.slowestRequest.method}
                  </span>
                </div>
                <div className='flex justify-between items-center border-b border-gray-100 pb-2'>
                  <span className='text-gray-500 font-medium'>Endpoint:</span>
                  <span className='text-gray-800 font-semibold break-all text-right ml-4'>
                    {metrics.slowestRequest.endpoint}
                  </span>
                </div>
                <div className='flex justify-between items-center border-b border-gray-100 pb-2'>
                  <span className='text-gray-500 font-medium'>Response Time:</span>
                  <span className='text-red-600 font-bold text-lg'>
                    {metrics.slowestRequest.responseTime} ms
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-500 font-medium'>Time:</span>
                  <span className='text-gray-600 text-xs'>
                    {new Date(metrics.slowestRequest.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              <p className='text-gray-400 text-center py-4'>No requests recorded yet.</p>
            )}
          </div>
        </div>

        {/* Fastest Request card */}
        <div className='bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden'>
          <div className='bg-green-50 px-5 py-4 border-b border-gray-200 flex items-center gap-2'>
            <span className='w-3 h-3 bg-green-500 rounded-full'></span>
            <h3 className='font-semibold text-green-800'>Fastest Request (Min Latency)</h3>
          </div>
          <div className='p-5'>
            {metrics.fastestRequest ? (
              <div className='space-y-3'>
                <div className='flex justify-between items-center border-b border-gray-100 pb-2'>
                  <span className='text-gray-500 font-medium'>HTTP Method:</span>
                  <span className='px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded'>
                    {metrics.fastestRequest.method}
                  </span>
                </div>
                <div className='flex justify-between items-center border-b border-gray-100 pb-2'>
                  <span className='text-gray-500 font-medium'>Endpoint:</span>
                  <span className='text-gray-800 font-semibold break-all text-right ml-4'>
                    {metrics.fastestRequest.endpoint}
                  </span>
                </div>
                <div className='flex justify-between items-center border-b border-gray-100 pb-2'>
                  <span className='text-gray-500 font-medium'>Response Time:</span>
                  <span className='text-green-600 font-bold text-lg'>
                    {metrics.fastestRequest.responseTime} ms
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-500 font-medium'>Time:</span>
                  <span className='text-gray-600 text-xs'>
                    {new Date(metrics.fastestRequest.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              <p className='text-gray-400 text-center py-4'>No requests recorded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestDashboard
