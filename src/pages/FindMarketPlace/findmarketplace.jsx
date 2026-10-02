
import { useState } from "react";
import "./findmarketplace.css";

const products = [
    {
        id: 1,
        name: "Digital Blood Pressure Monitor",
        category: "Medical Equipment",
        price: "$45.00",
        image: "/images/blood-pressure-monitor.png",
    },
    {
        id: 2,
        name: "Digital Thermometer",
        category: "Medical Equipment",
        price: "$12.00",
        image: "/images/thermometer.png",
    },
    {
        id: 3,
        name: "Pulse Oximeter",
        category: "Medical Equipment",
        price: "$25.00",
        image: "/images/pulse-oximeter.png",
    },
    {
        id: 4,
        name: "First Aid Kit",
        category: "Healthcare",
        price: "$30.00",
        image: "/images/first-aid-kit.png",
    },
    {
        id: 5,
        name: "Medical Face Mask",
        category: "Healthcare",
        price: "$8.00",
        image: "/images/face-mask.png",
    },
    {
        id: 6,
        name: "Vitamin Organizer",
        category: "Healthcare",
        price: "$15.00",
        image: "/images/vitamin-organizer.png",
    },
];

function FindMarketplace() {
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [cartCount, setCartCount] = useState(0);

    const categories = [
        "All",
        "Medical Equipment",
        "Healthcare",
        "Medicine",
    ];

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchText.toLowerCase());

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const handleAddToCart = () => {
        setCartCount((currentCount) => currentCount + 1);
    };

    return (
        <div className="marketplace-page">

            {/* Page Header */}
            <div className="marketplace-header">
                <div>
                    <h1>Find Marketplace</h1>
                    <p>
                        Find healthcare products and medical essentials
                        in one place.
                    </p>
                </div>

                <button className="cart-button">
                    <span className="cart-icon">🛒</span>
                    Cart
                    {cartCount > 0 && (
                        <span className="cart-count">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Search Section */}
            <div className="marketplace-search-section">
                <div className="marketplace-search">
                    <span className="search-icon">⌕</span>

                    <input
                        type="search"
                        placeholder="Search products..."
                        value={searchText}
                        onChange={(event) =>
                            setSearchText(event.target.value)
                        }
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="marketplace-categories">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={
                            selectedCategory === category
                                ? "category-button active"
                                : "category-button"
                        }
                        onClick={() =>
                            setSelectedCategory(category)
                        }
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Marketplace Content */}
            <section className="marketplace-content">

                <div className="section-heading">
                    <div>
                        <h2>Healthcare Products</h2>
                        <p>
                            Browse products available in the marketplace.
                        </p>
                    </div>

                    <span className="product-count">
                        {filteredProducts.length} Products
                    </span>
                </div>

                {/* Products */}
                {filteredProducts.length > 0 ? (
                    <div className="products-grid">
                        {filteredProducts.map((product) => (
                            <article
                                className="product-card"
                                key={product.id}
                            >
                                <div className="product-image-container">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                </div>

                                <div className="product-info">
                                    <span className="product-category">
                                        {product.category}
                                    </span>

                                    <h3>{product.name}</h3>

                                    <div className="product-bottom">
                                        <span className="product-price">
                                            {product.price}
                                        </span>

                                        <button
                                            className="add-cart-button"
                                            onClick={handleAddToCart}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="no-products">
                        <div className="no-products-icon">
                            🔍
                        </div>

                        <h3>No products found</h3>

                        <p>
                            Try searching for another product or
                            selecting a different category.
                        </p>
                    </div>
                )}

            </section>

        </div>
    );
}

export default FindMarketplace;
