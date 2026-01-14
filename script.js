const recipes = [
  {
    name: "អាម៉ុកត្រី (Amok Trey)",
    ingredients: ["ត្រីសាច់ស (500g)", "ទឹកកូកូខ្ចី (400ml)", "គ្រឿងទឹកគ្រឿង (2 ស្លាបព្រា)", "ពងពា (២)", "ត្រីឃា (2 ស្លាបព្រា)", "ស្ករឥដ្ឋ (1 ស្លាបព្រា)", "ស្លឹកតាពង"],
    instructions: [
      "ដកគ្រឿងទឹកគ្រឿងជាមួយខ្ញី ស្លឹកគោ រសជាតិ និងម្រេច។",
      "លាយត្រីជាមួយទឹកកូកូ ពង ត្រីឃា ស្ករ និងគ្រឿងទឹកគ្រឿង។",
      "រុំក្នុងស្លឹកតាពង បច្ចេកវ័យចំហាយ ១៥-២០ នាទី។"
    ]
  },
  {
    name: "ឡុកឡាក់ (Lok Lak)",
    ingredients: ["សាច់គោខ្លាញ់ (500g)", "ទឹកស៊ីអ៊ីវ (3 ស្លាបព្រា)", "ទឹកស៊ុយ (2 ស្លាបព្រា)", "ម្រេចកំពត (1 ស្លាបព្រា)", "ខ្ញី (៤ ពោត)", "អង្កាម និងទឹកដោះគោ"],
    instructions: [
      "ជ្រលកសាច់ជាមួយទឹកស៊ីអ៊ីវ ទឹកស៊ុយ ខ្ញី និងម្រេច ៣០ នាទី។",
      "ច្រក់សាច់ក្តៅខ្លាំងរហូតទទេ។",
      "បម្រើជាមួយបាយ ពងជូរលាយ និងទឹកចាញ់អង្កាម។"
    ]
  },
  {
    name: "បាយសាច់ជ្រូក (Bai Sach Chrouk)",
    ingredients: ["សាច់ជ្រូកស៊ុត (500g)", "ទឹកស៊ុយ (3 ស្លាបព្រា)", "ស្ករឥដ្ឋ (2 ស្លាបព្រា)", "ខ្ញី (៤ ពោត)", "ទឹកកូកូខ្ចី (100ml)", "ផ្លែបៃតង និងវល្លិ៍ផ្អែម"],
    instructions: [
      "ជ្រលកសាច់តាមទឹកស៊ុយ ស្ករ ខ្ញី និងទឹកកូកូមួយយប់។",
      "យាយសាច់ក្នុងភ្លើងធ្យាល់រហូតស្ងួត។",
      "បម្រើជាមួយបាយ និងផ្លែបៃតងវល្លិ៍។"
    ]
  }
];

const recipesDiv = document.getElementById('recipes');
const searchInput = document.getElementById('search');
const themeToggle = document.getElementById('theme-toggle');

// THEME TOGGLE - WORKING!
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('teukKroeungTheme', isDark ? 'dark' : 'light');
});

// Load saved theme
const savedTheme = localStorage.getItem('teukKroeungTheme') || 'light';
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
  themeToggle.textContent = '☀️';
}

function displayRecipes(filter = '') {
  recipesDiv.innerHTML = '';
  const filtered = recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  if (filtered.length === 0) {
    recipesDiv.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; color: var(--text-secondary);">
        <div style="font-size: 4em; margin-bottom: 20px;">🍲</div>
        <h3 style="font-size: 1.8em; margin-bottom: 10px;">មិនរកឃើញរូបមន្ត</h3>
        <p style="font-size: 1.2em;">សូមស្វែងរកម្តងទៀត!</p>
      </div>
    `;
    return;
  }
  
  filtered.forEach((recipe, index) => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <div class="recipe-header" onclick="toggleDetails(event, ${index})">
        <h3>${recipe.name}</h3>
        <button class="toggle-btn" onclick="event.stopPropagation(); toggleDetails(event, ${index})">
          បង្ហាញព័ត៌មានលម្អិត
        </button>
      </div>
      <div class="recipe-details">
        <h4>គ្រឿងផ្សំ:</h4>
        <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
        <h4>របៀបធ្វើ:</h4>
        <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>
      </div>
    `;
    recipesDiv.appendChild(card);
  });
}

function toggleDetails(event, index) {
  event.stopPropagation();
  const card = document.querySelectorAll('.recipe-card')[index];
  const details = card.querySelector('.recipe-details');
  const btn = card.querySelector('.toggle-btn');
  
  details.classList.toggle('show');
  btn.textContent = details.classList.contains('show') ? 
    'លាក់ព័ត៌មានលម្អិត' : 'បង្ហាញព័ត៌មានលម្អិត';
}

searchInput.addEventListener('input', (e) => {
  displayRecipes(e.target.value);
});

displayRecipes();
