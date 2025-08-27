const API_URL = "http://localhost:1234/recipes";

const recipesContainer = document.getElementById("recipes");
const form = document.getElementById("recipe-form");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalClose = document.getElementById("modal-close");
const btnNew = document.getElementById("btn-new");
const messages = document.getElementById("messages");

// -----------
// UTILIDADES
// -----------
function showMessage(msg, type = "success") {
  messages.textContent = msg;
  messages.className = type;
  setTimeout(() => {
    messages.textContent = "";
    messages.className = "";
  }, 3000);
}

function openModal(edit = false, recipe = null) {
  modal.classList.remove("hidden");
  if (edit) {
    modalTitle.textContent = "Editar Receta";
    document.getElementById("recipe-id").value = recipe.id;
    document.getElementById("title").value = recipe.title;
    document.getElementById("instructions").value = recipe.instructions;
    document.getElementById("time").value = recipe.time;
    document.getElementById("difficulty").value = recipe.difficulty;
    document.getElementById("ingredients").value = recipe.ingredients.join(", ");
  } else {
    modalTitle.textContent = "Nueva Receta";
    form.reset();
    document.getElementById("recipe-id").value = "";
  }
}

function closeModal() {
  modal.classList.add("hidden");
}

// -----------
// CRUD
// -----------
async function loadRecipes(query = "") {
  const res = await fetch(`${API_URL}${query}`);
  const data = await res.json();
  renderRecipes(data);
}

function renderRecipes(recipes) {
  recipesContainer.innerHTML = "";
  if (recipes.length === 0) {
    recipesContainer.innerHTML = "<p>No hay recetas.</p>";
    return;
  }

  recipes.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <h3>${recipe.title}</h3>
      <p><strong>Dificultad:</strong> ${recipe.difficulty}</p>
      <p><strong>Tiempo:</strong> ${recipe.time} min</p>
      <p><strong>Ingredientes:</strong> ${recipe.ingredients.join(", ")}</p>
      <div class="actions">
        <button onclick='editRecipe(${JSON.stringify(recipe)})'>Editar</button>
        <button onclick='deleteRecipe("${recipe.id}")'>Eliminar</button>
      </div>
    `;
    recipesContainer.appendChild(card);
  });
}

async function saveRecipe(e) {
  e.preventDefault();

  const id = document.getElementById("recipe-id").value;
  const recipe = {
    title: document.getElementById("title").value,
    instructions: document.getElementById("instructions").value,
    time: parseInt(document.getElementById("time").value),
    difficulty: document.getElementById("difficulty").value,
    ingredients: document.getElementById("ingredients").value.split(",").map(i => i.trim())
  };

  try {
    let res;
    if (id) {
      res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe)
      });
    } else {
      res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe)
      });
    }

    if (!res.ok) throw new Error("Error al guardar receta");
    await loadRecipes();
    closeModal();
    showMessage("Receta guardada con éxito ✅", "success");
  } catch (err) {
    showMessage(err.message, "error");
  }
}

async function deleteRecipe(id) {
  if (!confirm("¿Seguro que deseas eliminar esta receta?")) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar receta");
    await loadRecipes();
    showMessage("Receta eliminada con éxito 🗑️", "success");
  } catch (err) {
    showMessage(err.message, "error");
  }
}

function editRecipe(recipe) {
  openModal(true, recipe);
}

// -----------
// EVENTOS
// -----------
form.addEventListener("submit", saveRecipe);
modalClose.addEventListener("click", closeModal);
btnNew.addEventListener("click", () => openModal(false));

// Filtros
document.getElementById("btn-filter").addEventListener("click", () => {
  const title = document.getElementById("filter-title").value;
  const ingredient = document.getElementById("filter-ingredient").value;
  const difficulty = document.getElementById("filter-difficulty").value;
  const time = document.getElementById("filter-time").value;

  let query = [];
  if (title) query.push(`title=${encodeURIComponent(title)}`);
  if (ingredient) query.push(`ingredient=${encodeURIComponent(ingredient)}`);
  if (difficulty) query.push(`difficulty=${encodeURIComponent(difficulty)}`);
  if (time) query.push(`time_lte=${encodeURIComponent(time)}`);

  const queryString = query.length > 0 ? `?${query.join("&")}` : "";
  loadRecipes(queryString);
});

// -----------
// INICIO
// -----------
loadRecipes();
