import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useLoginMutation } from '../api/authApi'

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [login, { isLoading, error }] = useLoginMutation()
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(form).unwrap()
      navigate('/', { replace: true })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <h2 className="text-2xl font-bold">Login</h2>

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
          {error?.data?.message || 'Login failed'}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      <p className="text-sm text-center">
        No account? <Link to="/register" className="text-blue-600">Register</Link>
      </p>
    </form>
  )
}