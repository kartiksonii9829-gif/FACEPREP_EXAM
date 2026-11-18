const products = [
  { name: "Wireless Headphones", category: "Electronics", price: 59.99 },
  { name: "Smart Watch", category: "Electronics", price: 89.5 },
  { name: "Portable Speaker", category: "Electronics", price: 39.99 },
  { name: "Lined Notebook", category: "Stationary", price: 4.5 },
  { name: "Gel Pen Set", category: "Stationary", price: 8.99 },
  { name: "Desk Organizer", category: "Stationary", price: 16 },
  { name: "Everyday Backpack", category: "Fashion", price: 34.99 },
  { name: "Classic Cap", category: "Fashion", price: 19.5 }
];

const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#category-filter");
const productGrid = document.querySelector("#product-grid");
const resultsSummary = document.querySelector("#results-summary");
const emptyState = document.querySelector("#empty-state");

function renderProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const matchingProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  productGrid.replaceChildren();
  emptyState.hidden = matchingProducts.length > 0;
  resultsSummary.hidden = matchingProducts.length === 0;

  matchingProducts.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const name = document.createElement("h2");
    name.textContent = product.name;

    const details = document.createElement("div");
    details.className = "product-details";

    const category = document.createElement("span");
    category.className = "category-tag";
    category.textContent = product.category;

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = `$${product.price.toFixed(2)}`;

    details.append(category, price);
    card.append(name, details);
    productGrid.append(card);
  });

  resultsSummary.textContent = `Showing ${matchingProducts.length} of ${products.length} products`;
}

searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);

renderProducts();
