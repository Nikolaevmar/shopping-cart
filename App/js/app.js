const porductsListEl = document.querySelector(".products-list");
const seeMoreBtn = document.querySelector(".see-more-btn");

seeMoreBtn.addEventListener("click", () => {
  porductsListEl.scrollIntoView({ behavior: "smooth" });
});

// add cart on click event

