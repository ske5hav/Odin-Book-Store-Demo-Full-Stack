
import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: '₹299',
    category: 'Classic',
    image: 'https://covers.openlibrary.org/b/id/7222246-L.jpg'
  },
  {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    price: '₹399',
    category: 'Self Growth',
    image: 'https://covers.openlibrary.org/b/id/12547191-L.jpg'
  },
  {
    id: 3,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    price: '₹599',
    category: 'Programming',
    image: 'https://covers.openlibrary.org/b/id/9647925-L.jpg'
  },
  {
    id: 4,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    price: '₹349',
    category: 'Fiction',
    image: 'https://covers.openlibrary.org/b/id/8101016-L.jpg'
  }
]

const Home = ({ user, error }) => {
  return (
    <div className="store">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small">WELCOME TO ODIN BOOK STORE</p>

          <h1>
            Discover Your Next
            <span> Favourite Book</span>
          </h1>

          <p className="hero-description">
            Explore thousands of books and discover new ideas,
            knowledge and adventures.
          </p>

          {user ? (
            <h3 className="welcome-user">
              Welcome, {user.name}!
            </h3>
          ) : (
            <div className="hero-buttons">
              <Link to="/login" className="shop-btn">
                Login Now
              </Link>

              <Link to="/register" className="register-btn">
                Create Account
              </Link>
            </div>
          )}
        </div>

        <div className="hero-image">
          <div className="book-emoji"><span><img src="https://www.theodinproject.com/assets/icons/odin-icon-22b41941.svg" alt="" /></span></div>
          <p>Read More. Learn More.</p>
        </div>
      </section>

      {/* Error Message */}
      {error && <p className="store-error">{error}</p>}

      {/* Categories */}
      <section className="categories">
        <div className="section-heading">
          <a href="https://www.theodinproject.com/"><p>EXPLORE COLLECTIONS</p></a>
          <h2>Browse Categories</h2>
        </div>

        <div className="category-grid">
          <div className="category-card">
            <span><img src="https://www.theodinproject.com/assets/badge-html-css-4d74ba92.svg" alt="" /></span>
            <h3>Programming</h3>
          </div>

          <div className="category-card">
            <span><img src="https://www.theodinproject.com/assets/badge-react-21ede6f9.svg" alt="" /></span>
            <h3>Fiction</h3>
          </div>

          <div className="category-card">
            <span><img src="https://www.theodinproject.com/assets/badge-ruby-2e00add1.svg" alt="" /></span>
            <h3>Self Growth</h3>
          </div>

          <div className="category-card">
            <span><img src="https://www.theodinproject.com/assets/badge-getting-hired-87e39081.svg" alt="" /></span>
            <h3>Science</h3>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="featured-books">
        <div className="section-heading">
          <p>OUR COLLECTION</p>
          <h2>Featured Books</h2>
        </div>

        <div className="book-grid">
          {books.map((book) => (
            <div className="book-card" key={book.id}>

              <div className="book-image">
                <img src={book.image} alt={book.title} />
              </div>

              <div className="book-info">
                <span className="book-category">
                  {book.category}
                </span>

                <h3>{book.title}</h3>
                <p>{book.author}</p>

                <div className="book-bottom">
                  <strong>{book.price}</strong>
                  <button>Buy Now</button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="store-footer">
        <div className="footer-content">

          <div className="footer-about">
            <h2><span><img src="https://www.theodinproject.com/assets/icons/odin-icon-22b41941.svg" alt="" /></span> Odin Book Store</h2>
            <p>
              Your favourite destination for books,
              knowledge and learning.
            </p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>

          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p>Email: support@odinbook.com</p>
            <p>Discover. Read. Grow.</p>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 Odin Book Store. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  )
}

export default Home
