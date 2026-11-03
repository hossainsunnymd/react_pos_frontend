import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRegisterMutation } from '../api/authApi'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [register, { isLoading, error }] = useRegisterMutation()
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(form).unwrap()
      navigate('/', { replace: true })
    } catch(e) {console.error(e)}
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold">Register</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full name"
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full border rounded px-3 py-2"
        />

        {error && (
          <p className="text-red-600 text-sm">
            {error?.data?.message || 'Register failed'}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Register'}
        </button>

        <p className="text-sm text-center">
          Already have account?{' '}
          <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  )
}