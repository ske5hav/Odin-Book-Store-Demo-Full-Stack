
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Navbar.css'

const Navbar = ({ user, setUser }) => {

  const navigate = useNavigate()

  const handlelogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      )

      setUser(null)
      navigate("/")
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  return (
    <nav className="navbar">

      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <span><img src="https://www.theodinproject.com/assets/icons/odin-icon-22b41941.svg" alt="" /></span>
        Odin Book Store
      </Link>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <a href="#categories">Categories</a>
        <a href="#featured-books">Books</a>
      </div>

      {/* User Authentication */}
      <div className="navbar-auth">

        {user ? (
          <>
            <span className="navbar-username">
              Hi, {user.name}
            </span>

            <button
              type="button"
              className="logout-btn"
              onClick={handlelogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">
              Login
            </Link>

            <Link to="/register" className="register-btn">
              Register
            </Link>
          </>
        )}

      </div>

    </nav>
  )
}

export default Navbar
