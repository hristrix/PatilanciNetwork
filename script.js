const screens = {
  home: { file: '01-home', width: 1600, height: 1000, alt: 'Начален екран на Patilanci Launcher с Minecraft и вход в профила', title: 'Оттук влизаш в играта.', description: 'Влез в профила си, виж модпака и стартирай Minecraft от началния екран.' },
  modpack: { file: '02-modpack', width: 1600, height: 1060, alt: 'Екран на Patilanci Adventures с информация за модпака и автоматичните обновления', title: 'Всичко за модпака.', description: 'Виж коя версия на Patilanci Adventures е инсталирана и какви модове включва.' },
  mods: { file: '03-mods', width: 1600, height: 1380, alt: 'Колекцията с модове: Fabric API, Sodium, Iris Shaders, картите на Xaero и Simple Voice Chat', title: 'Модовете в пакета и тези, които добавиш.', description: 'Разгледай списъка с модове и управлявай тези, които си добавил сам.' },
  settings: { file: '04-settings', width: 1600, height: 1200, alt: 'Настройки на launcher-а за паметта, Java и обновленията', title: 'Настрой паметта и Java.', description: 'Избери колко памет да използва играта. За нужната версия на Java може да се погрижи launcher-ът.' },
  updates: { file: '05-update-notification', width: 1600, height: 1120, alt: 'Начален екран с известие за нова версия на Patilanci Adventures', title: 'Ще видиш, когато има обновление.', description: 'Когато излезе нова версия на модпака, на началния екран се появява известие.' },
  console: { file: '06-game-console', width: 1600, height: 900, alt: 'Minecraft конзола с търсене, филтриране и копиране на изхода', title: 'Ако нещо не тръгва, погледни тук.', description: 'В конзолата можеш да следиш съобщенията на играта, да търсиш грешки и да копираш текста.' }
};
const tabs = [...document.querySelectorAll('[data-screen]')];
const panel = document.getElementById('launcher-panel');
const galleryImage = document.getElementById('gallery-image');
function selectScreen(tab) {
  const screen = screens[tab.dataset.screen];
  if (!screen) return;
  tabs.forEach(item => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
  });
  panel.setAttribute('aria-labelledby', tab.id);
  galleryImage.src = `./launcher_screenshots/${screen.file}.webp`;
  galleryImage.alt = screen.alt;
  galleryImage.width = screen.width;
  galleryImage.height = screen.height;
  document.getElementById('screenshot-link').href = `./launcher_screenshots/${screen.file}.png`;
  document.getElementById('screen-title').textContent = screen.title;
  document.getElementById('screen-description').textContent = screen.description;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectScreen(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    tabs[next].focus();
    selectScreen(tabs[next]);
    tabs[next].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
  });
});
