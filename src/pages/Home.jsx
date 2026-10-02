import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="small-title">NEW ARRIVALS</p>

          <h1>
            FIND CLOTHES
            <br />
            THAT MATCH
            <br />
            YOUR STYLE
          </h1>

          <p className="hero-text">
            Browse our latest collection of clothes designed
            for your everyday style.
          </p>

          <Link to="/shop" className="shop-button">
            Shop Now
          </Link>

          <div className="hero-stats">
            <div>
              <strong>200+</strong>
              <span>International Brands</span>
            </div>

            <div>
              <strong>2,000+</strong>
              <span>High-Quality Products</span>
            </div>

            <div>
              <strong>30,000+</strong>
              <span>Happy Customers</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="hero-model">SHOP.CO</div>
        </div>
      </section>

      <section className="brands">
        <h2>POPULAR BRANDS</h2>

        <div className="brand-list">
          <span>NIKE</span>
          <span>GUCCI</span>
          <span>PRADA</span>
          <span>VERSACE</span>
          <span>ADIDAS</span>
        </div>
      </section>

      <section className="home-section">
        <h2>NEW ARRIVALS</h2>

        <p>
          Discover the latest styles from our collection.
        </p>

        <Link to="/shop" className="secondary-button">
          View All Products
        </Link>
      </section>
    </div>
  );
}

export default Home;