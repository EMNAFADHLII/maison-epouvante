const container = document.getElementById("listings");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("categoryFilter");
const priceInput = document.getElementById("priceFilter");

let allListings = [];

async function loadListings() {
  allListings = await apiFetch("/listings");
  applyFilters();
}

function categoryBadge(category) {
  const map = {
    Hantée: "danger",
    Abandonnée: "secondary",
    Maudite: "warning",
    Mystérieuse: "info",
  };
  return `<span class="badge bg-${map[category]} mb-2">${category}</span>`;
}

function applyFilters() {
  const search = searchInput.value.toLowerCase();
  const category = categorySelect.value;
  const maxPrice = priceInput.value;

  const filtered = allListings.filter(l => {
    const matchText =
      l.title.toLowerCase().includes(search) ||
      l.description.toLowerCase().includes(search);

    const matchCategory = !category || l.category === category;
    const matchPrice = !maxPrice || l.price <= Number(maxPrice);

    return matchText && matchCategory && matchPrice;
  });

  render(filtered);
}

function render(listings) {
  container.innerHTML = "";

  if (listings.length === 0) {
    container.innerHTML = `
      <div class="text-center text-muted">
        <p>Aucune maison ne correspond à vos critères…</p>
      </div>
    `;
    return;
  }

  listings.forEach((l, index) => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    // animation apparition
    col.style.opacity = "0";
    col.style.transform = "translateY(20px)";
    col.style.transition = "all 0.5s ease";

    col.innerHTML = `
      <div class="card bg-black border-danger h-100 shadow-sm"
           style="transition: transform .3s, box-shadow .3s">
        <img src="${l.imageUrl || "https://placehold.co/600x400?text=Maison+Epouvante"}"
             class="card-img-top">
        <div class="card-body">
          ${categoryBadge(l.category)}
          <h5 class="card-title text-danger">${l.title}</h5>
          <p class="card-text">${l.description}</p>
          <p class="fw-bold">${l.location} — ${l.price} €</p>
        </div>
      </div>
    `;

    // hover animation
    col.querySelector(".card").addEventListener("mouseenter", e => {
      e.currentTarget.style.transform = "scale(1.03)";
      e.currentTarget.style.boxShadow = "0 0 20px rgba(220,53,69,0.6)";
    });

    col.querySelector(".card").addEventListener("mouseleave", e => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "none";
    });

    container.appendChild(col);

    // apparition progressive
    setTimeout(() => {
      col.style.opacity = "1";
      col.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// listeners filtres
searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);
priceInput.addEventListener("input", applyFilters);
