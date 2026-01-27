// List of static frontend images
const catImages = [
    { file: "sleepy1.jpg", mood: "sleepy" },
    { file: "sleepy2.jpg", mood: "sleepy" },
    { file: "playful1.jpg", mood: "playful" },
    { file: "playful2.jpg", mood: "playful" },
    { file: "curious1.jpg", mood: "curious" },
    { file: "curious2.jpg", mood: "curious" }
];

const gallery = document.getElementById("catGallery");

// Build gallery cards dynamically
catImages.forEach(({ file, mood }) => {
    const name = file.replace(/\.[^/.]+$/, ""); // remove extension
    const card = document.createElement("div");
    card.className = "col-12 col-sm-6 col-lg-4 cat-card";
    card.dataset.mood = mood;

    card.innerHTML = `
  <div class="card gallery-card h-100">
    <img src="assets/cats/${file}" class="card-img-top" alt="${name}" />
    <div class="card-body">
      <h5 class="card-title mb-1">${name}</h5>
      <p class="card-text mb-0 text-muted">Mood: ${mood}</p>
    </div>
  </div>
`;

    gallery.appendChild(card);
});

// Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const catCards = () => document.querySelectorAll(".cat-card");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        catCards().forEach(card => {
            card.classList.toggle("d-none", filter !== "all" && card.dataset.mood !== filter);
        });
    });
});

// Modal logic
const modalImage = document.getElementById("modalImage");
const imageModal = new bootstrap.Modal(document.getElementById("imageModal"));

gallery.addEventListener("click", e => {
    const card = e.target.closest(".gallery-card");
    if (!card) return;

    const img = card.querySelector("img");
    modalImage.src = img.src;
    modalImage.alt = img.alt;
    document.getElementById("imageModalLabel").textContent = img.alt;

    imageModal.show();
});