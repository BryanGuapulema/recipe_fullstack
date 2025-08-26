# 🍳 Gestor de Recetas de Cocina

## 🎯 Objetivo
Construir una API para gestionar recetas, reforzando **CRUD + validaciones + filtros**.  
El frontend será básico, solo para consumir la API y probar su funcionamiento.

---

## ⚙️ Backend

### Endpoints principales
- `GET /recipes` → Listar todas las recetas.  ✅
- `GET /recipes/:id` → Obtener una receta por ID.  ✅
- `POST /recipes` → Crear una receta nueva.  
- `PATCH /recipes/:id` → Actualizar receta (parcialmente).  
- `DELETE /recipes/:id` → Eliminar receta.  ✅

### Filtros y búsquedas
- `GET /recipes?title=carbonara` → Buscar por título.  ✅
- `GET /recipes?ingredient=egg` → Buscar recetas que incluyan un ingrediente.  ✅
- `GET /recipes?difficulty=easy` → Filtrar por dificultad.  ✅
- `GET /recipes?time_lte=30` → Filtrar por tiempo de preparación menor o igual a 30 minutos. ✅ 

### Validaciones con Zod
- `title`: string no vacío, máximo 100 caracteres.  
- `ingredients`: array de strings, mínimo 2 elementos.  
- `instructions`: string, mínimo 20 caracteres.  
- `time`: número positivo.  
- `difficulty`: enum: `"easy" | "medium" | "hard"`.

---

## 🖥️ Frontend

### Funcionalidades
- Listar recetas en tarjetas o tabla.  
- Formulario para **crear receta** (puede ser modal).  
- Formulario para **editar receta** con datos precargados.  
- Botones para **eliminar receta**.  
- Inputs de búsqueda/filtros:
  - Por **ingrediente**  
  - Por **dificultad**  
  - Por **tiempo** (máximo de preparación)  
- Mostrar mensajes de **éxito o error** al realizar cualquier operación.  
- Posibilidad de combinar filtros (ej: ingrediente + dificultad).  

---

## 📂 Requisitos técnicos

- Backend en **Node.js** con **Express**.  
- Validaciones usando **Zod**.  
- Base de datos temporal en un archivo **`recipes.json`**.  
- Frontend simple usando **HTML, CSS y JavaScript puro**.  
- Posibilidad de levantar **frontend y backend desde la carpeta padre** usando scripts `npm` o `npx serve`.  
- Uso correcto de métodos HTTP: `GET`, `POST`, `PATCH`, `DELETE`.  
- Manejo de arrays en los datos (`ingredients`).  
- Uso de **PATCH** para actualizaciones parciales.  

---
