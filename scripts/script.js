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
