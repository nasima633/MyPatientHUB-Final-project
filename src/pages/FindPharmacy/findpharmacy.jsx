import { useState } from "react";
import "./findpharmacy.css";

import painkillers from "../../assets/images/painkillers.png";
import coldMedicine from "../../assets/images/cold-medicine.png";
import vitamins from "../../assets/images/vitamins.png";
import digestiveMedicine from "../../assets/images/digestive-medicine.png";
import allergyMedicine from "../../assets/images/allergy-medicine.png";
import woundCare from "../../assets/images/wound-care.png";

const products = [
    {
        id: 1,
        name: "Painkillers",
        category: "Pain Relief",
        price: "$10.00",
        image: painkillers,
    },
    {
        id: 2,
        name: "Cold & Flu Medicine",
        category: "Cold & Flu",
        price: "$15.00",
        image: coldMedicine,
    },
    {
        id: 3,
        name: "Vitamins",
        category: "Vitamins",
        price: "$20.00",
        image: vitamins,
    },
    {
        id: 4,
        name: "Digestive Medicine",
        category: "Digestive Health",
        price: "$12.00",
        image: digestiveMedicine,
    },
    {
        id: 5,
        name: "Allergy Medicine",
        category: "Allergy Relief",
        price: "$14.00",
        image: allergyMedicine,
    },
    {
        id: 6,
        name: "Wound Care Products",
        category: "Wound Care",
        price: "$18.00",
        image: woundCare,
    },
];

function FindPharmacy() {
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [cartCount, setCartCount] = useState(0);

    const categories = [
        "All",
        "Pain Relief",
        "Cold & Flu",
        "Vitamins",
        "Digestive Health",
        "Allergy Relief",
        "Wound Care",
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
            <div className="marketplace-header">
                <div>
                    <h1>Find Pharmacy</h1>

                    <p>
                        Find medicines and healthcare products
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

            <section className="marketplace-content">
                <div className="section-heading">
                    <div>
                        <h2>Pharmacy Products</h2>

                        <p>
                            Browse medicines and healthcare products
                            available in the pharmacy.
                        </p>
                    </div>

                    <span className="product-count">
                        {filteredProducts.length} Products
                    </span>
                </div>

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

export default FindPharmacy;