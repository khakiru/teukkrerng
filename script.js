const recipes = [
    {
    name: "សម្លការីសាច់មាន់ (Samlor Kari Sach Moan)",
    ingredients: [
        "សាច់មាន់ (600g)",
        "ទឹកដូងខ្ចី (500ml)",
        "គ្រឿងការី (2 ស្លាបព្រា)",
        "ដំឡូង (2 ផ្លែ)",
        "ការ៉ុត (1 ផ្លែ)",
        "ទឹកស៊ីអ៊ីវ (1 ស្លាបព្រា)",
        "ស្ករត្នោត (1 ស្លាបព្រា)"
    ],
    instructions: [
        "ឆាគ្រឿងការីឱ្យឈ្ងុយ។",
        "បន្ថែមសាច់មាន់ ហើយឆារហូតសាច់រឹង។",
        "ដាក់បន្លែ ទឹកដូង និងគ្រឿងផ្សំផ្សេងៗ។",
        "ទុកឱ្យពុះរហូតដល់សាច់ទន់។"
    ]
    },
    {
    name: "សម្លម្ជូរយួន​ត្រី (Samlor Mchu ​​​​​Youn Trey)",
    ingredients: [
        "ត្រី (400g)",
        "ម្នាស់ (1/2 ផ្លែ)",
        "ប៉េងប៉ោះ (2 ផ្លែ)",
        "ខ្ទឹមស (3 កំពឹស)",
        "ម្រេច",
        "ទឹកត្រី (2 ស្លាបព្រា)"
    ],
    instructions: [
        "ដាំទឹកឱ្យពុះ។",
        "ដាក់ត្រី និងបន្លែចូល។",
        "បន្ថែមទឹកត្រី និងម្រេច។",
        "ដាំរហូតដល់រសជាតិជូរឆ្ងាញ់។"
    ]
    },
    // {
    // name: "នំបញ្ចុក (Nom Banh Chok)",
    // ingredients: [
    //     "មីនំបញ្ចុក",
    //     "ទឹកសម្លខ្មែរ",
    //     "សណ្តែកគ្រាប់",
    //     "ត្រសក់",
    //     "ស្លឹកសាឡាត់",
    //     "ផ្កាចេក"
    // ],
    // instructions: [
    //     "រៀបមីក្នុងចាន។",
    //     "ចាក់ទឹកសម្លពីលើ។",
    //     "បន្ថែមបន្លែស្រស់។",
    //     "បម្រើភ្លាមៗ។"
    // ]
    // },
    {
    name: "បាយឆា​​ (Fried Rice)",
    ingredients: [
        "បាយ (2 ចាន)",
        "ពងមាន់ (2)",
        "ខ្ទឹមស (3 កំពឹស)",
        "ទឹកស៊ីអ៊ីវ (2 ស្លាបព្រា)",
        "សាច់មាន់ ឬ សាច់ជ្រូក"
    ],
    instructions: [
        "ឆាខ្ទឹមសឱ្យឈ្ងុយ។",
        "បន្ថែមពងមាន់ ហើយកូរ។",
        "ដាក់បាយ និងទឹកស៊ីអ៊ីវ។",
        "ឆារហូតដល់សព្វ។"
    ]
    },
    // {
    // name: "បបរសាច់ជ្រូក (Bor Sach Chrouk)",
    // ingredients: [
    //     "អង្ករ (1 ពែង)",
    //     "សាច់ជ្រូក (300g)",
    //     "ខ្ទឹមស",
    //     "ខ្ញី",
    //     "ទឹកត្រី"
    // ],
    // instructions: [
    //     "ដាំអង្ករជាមួយទឹកឱ្យក្លាយជាបបរ។",
    //     "បន្ថែមសាច់ជ្រូក និងខ្ញី។",
    //     "បន្ថែមទឹកត្រីតាមរសជាតិ។",
    //     "បម្រើក្តៅៗ។"
    // ]
    // }
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
