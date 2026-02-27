const container = document.getElementById("listings");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("categoryFilter");
const priceInput = document.getElementById("priceFilter");

let allListings = [];

function categoryBadge(category) {
  const map = {
    Hantee: "danger",
    Abandonnee: "secondary",
    Maudite: "warning",
    Mysterieuse: "info",
  };
  return `<span class="badge bg-${map[category] || "dark"} mb-2">${category || "Sans categorie"}</span>`;
}

async function loadListings() {
  if (!container) return;
  try {
    allListings = await apiFetch("/listings");
    applyFilters();
  } catch (err) {
    container.innerHTML = `<div class="text-danger">Impossible de charger les annonces: ${err.message}</div>`;
  }
}

function applyFilters() {
  const search = (searchInput?.value || "").toLowerCase();
  const category = categorySelect?.value || "";
  const maxPrice = priceInput?.value || "";

  const filtered = allListings.filter((l) => {
    const title = String(l.title || "").toLowerCase();
    const description = String(l.description || "").toLowerCase();
    const matchText = title.includes(search) || description.includes(search);

    const matchCategory = !category || l.category === category;
    const matchPrice = !maxPrice || Number(l.price) <= Number(maxPrice);

    return matchText && matchCategory && matchPrice;
  });

  render(filtered);
}

function render(listings) {
  if (!container) return;
  container.innerHTML = "";

  if (listings.length === 0) {
    container.innerHTML = `
      <div class="text-center text-muted">
        <p>Aucune maison ne correspond a vos criteres.</p>
      </div>
    `;
    return;
  }

  listings.forEach((l) => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    col.innerHTML = `
      <div class="card bg-black border-danger h-100 shadow-sm">
        <img src="${l.imageUrl || "https://placehold.co/600x400?text=Maison+Epouvante"}"
             class="card-img-top" alt="${l.title || "Maison"}">
        <div class="card-body">
          ${categoryBadge(l.category)}
          <h5 class="card-title text-danger">${l.title || "Sans titre"}</h5>
          <p class="card-text">${l.description || ""}</p>
          <p class="fw-bold">${l.location || "Lieu inconnu"} - ${l.price || 0} EUR</p>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
}

if (searchInput) searchInput.addEventListener("input", applyFilters);
if (categorySelect) categorySelect.addEventListener("change", applyFilters);
if (priceInput) priceInput.addEventListener("input", applyFilters);
