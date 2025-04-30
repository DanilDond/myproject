console.log("JS подключён!");

document.addEventListener("DOMContentLoaded", () => {
  // Данные для подменю (второй уровень)
  const submenuData = {
    zapascnye: [
      { label: "Печатающая техника", url: "/catalog/zapascnye/pechatayushchaya-tehnika/" },
      {
        label: "Малая бытовая техника",
        url: "/catalog/zapascnye/malaia-bytovaia-tehnika/",
        submenu: [
          { label: "DeLonghi", url: "/catalog/zapascnye/malaia-bytovaia-tehnika/delonghi/" },
          { label: "Leben", url: "/catalog/zapascnye/malaia-bytovaia-tehnika/leben/" },
          { label: "Mitsumau", url: "/catalog/zapascnye/malaia-bytovaia-tehnika/mitsumau/" },
          { label: "Mizar", url: "/catalog/zapascnye/malaia-bytovaia-tehnika/mizar/" },
          { label: "Polaris", url: "/catalog/zapascnye/malaia-bytovaia-tehnika/polaris/" },
          { label: "Scarlett", url: "/catalog/zapascnye/malaia-bytovaia-tehnika/scarlett/" },
          { label: "Vitek", url: "/catalog/zapascnye/malaia-bytovaia-tehnika/vitek/" },
        ],
      },
      { label: "Персональные компьютеры", url: "/catalog/zapascnye/personalnye-kompyutery/" },
      { label: "Ноутбуки", url: "/catalog/zapascnye/noutbuki/" },
      { label: "Смартфоны", url: "/catalog/zapascnye/smartfony/" },
      { label: "Планшеты", url: "/catalog/zapascnye/planchety/" },
      { label: "Телевизоры", url: "/catalog/zapascnye/televizory/" },
      { label: "Проектор", url: "/catalog/zapascnye/proektory/" },
      { label: "Мониторы", url: "/catalog/zapascnye/monitory/" },
    ],
    istochniki: [{ label: "Источники питания", url: "/catalog/istochniki-pitaniya/" }],
    radiodetali: [{ label: "Радиодетали", url: "/catalog/radiodetali/" }],
    instrumenty: [{ label: "Инструменты", url: "/catalog/instrumenty/" }],
    himia: [{ label: "Химия", url: "/catalog/himia/" }],
    raskhodnye: [{ label: "Расходные материалы", url: "/catalog/raskhodnye-materialy/" }],
    kabeli: [{ label: "Кабели и переходники", url: "/catalog/kabeli-i-perehodniki/" }],
    prochee: [{ label: "Прочее", url: "/catalog/prochee/" }],
  };

  const submenuContainer = document.getElementById("catalog-submenu");
  const rootItems = document.querySelectorAll(".catalog-menu__root-item");

  const updateSubmenu = (categoryId) => {
    const items = submenuData[categoryId] || [];
    const html = items
      .map((item) =>
        item.submenu
          ? `<div class="catalog-menu__submenu-item" data-has-submenu="true">
            <a href="${item.url}">${item.label}</a>
              <div class="catalog-menu__nested-submenu">
                ${item.submenu.map(nested => `<div class="catalog-menu__nested-submenu-item"><a href="${nested.url}">${nested.label}</a></div>`).join('')}
              </div>
            </div>`
          : `<div class="catalog-menu__submenu-item">
            <a href="${item.url}">${item.label}</a>
            </div>`
      )
      .join("");
    submenuContainer.innerHTML = html;
  };

  rootItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
      rootItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      const categoryId = item.getAttribute("data-category");
      updateSubmenu(categoryId);
    });
  });

  // Инициализация подменю для первого элемента по умолчанию
  if (rootItems.length > 0) {
    updateSubmenu(rootItems[0].getAttribute("data-category"));
  }
});

// Поиск внутри dropdown производителя
const models = [
  { name: 'Kyocera ECOSYS M3040dn', count: 3 },
  { name: 'Kyocera ECOSYS M3040idn', count: 5 },
  { name: 'Kyocera ECOSYS M3540idn', count: 4 },
  { name: 'Kyocera ECOSYS M3550idn', count: 2 },
  { name: 'Kyocera ECOSYS M3560idn', count: 1 },
  { name: 'Kyocera ECOSYS P3260dn', count: 3 },
  { name: 'Kyocera ECOSYS P3045dn', count: 1 },
  { name: 'Kyocera ECOSYS P3050dn', count: 4 },
  { name: 'Kyocera ECOSYS P3055dn', count: 6 },
  { name: 'Kyocera ECOSYS P3060dn', count: 2 },
  { name: 'Kyocera ECOSYS M3145dn', count: 3 },
  { name: 'Kyocera ECOSYS M3645dn', count: 5 },
  { name: 'Kyocera ECOSYS M3655', count: 2 }
];

const modelList = document.getElementById("modelList");
const searchInput = document.getElementById("modelSearch");
const toggleBtn = document.getElementById("toggleModels");
const clearBtn = document.getElementById("clearModels");

let expanded = false;

function renderModels(filter = "") {
  modelList.innerHTML = "";
  const filtered = models.filter(m => m.name.toLowerCase().includes(filter.toLowerCase()));
  const displayed = expanded ? filtered : filtered.slice(0, 5);
  displayed.forEach((model, index) => {
    const id = `model${index}`;
    const div = document.createElement("div");
    div.className = "form-check";
    div.innerHTML = `
      <input class="form-check-input" type="checkbox" id="${id}" value="${model.name}">
      <label class="form-check-label" for="${id}">${model.name} <span class="text-muted">(${model.count})</span></label>
    `;
    modelList.appendChild(div);
  });

  toggleBtn.style.display = filtered.length > 5 ? "inline-block" : "none";
  toggleBtn.textContent = expanded ? "Свернуть" : "Показать все";
}

searchInput.addEventListener("input", () => {
  expanded = false;
  renderModels(searchInput.value);
});

toggleBtn.addEventListener("click", () => {
  expanded = !expanded;
  renderModels(searchInput.value);
});

clearBtn.addEventListener("click", () => {
  modelList.querySelectorAll("input[type=checkbox]").forEach(chk => chk.checked = false);
});

// Инициализация
renderModels();
