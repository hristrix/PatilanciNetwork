const screens = {
  home: { file: '01-home', width: 1600, height: 1000, alt: 'Начален екран на Patilanci Launcher с Minecraft и вход в профила', title: 'Едно кликване до следващата история.', description: 'Твоят профил, модпакът и пътят към сървъра — на началния екран.' },
  modpack: { file: '02-modpack', width: 1600, height: 1060, alt: 'Екран на Patilanci Adventures с информация за модпака и автоматичните обновления', title: 'Познатият Minecraft. Повече възможности.', description: 'Разгледай Patilanci Adventures, включените модове и информацията за инсталирания модпак.' },
  mods: { file: '03-mods', width: 1600, height: 1380, alt: 'Колекцията с модове: Fabric API, Sodium, Iris Shaders, картите на Xaero и Simple Voice Chat', title: 'Основата от нас. Допълненията от теб.', description: 'Преглеждай модовете в пакета и управлявай своите допълнения от едно място.' },
  settings: { file: '04-settings', width: 1600, height: 1200, alt: 'Настройки на launcher-а за паметта, Java и обновленията', title: 'Малко настройки. Точно по твоя вкус.', description: 'Избери паметта за Minecraft и остави launcher-а да управлява необходимите Java версии.' },
  updates: { file: '05-update-notification', width: 1600, height: 1120, alt: 'Начален екран с известие за нова версия на Patilanci Adventures', title: 'Новото приключение няма да те подмине.', description: 'Известията за нов модпак са на началния екран, за да си винаги в крак с общия свят.' },
  console: { file: '06-game-console', width: 1600, height: 900, alt: 'Minecraft конзола с търсене, филтриране и копиране на изхода', title: 'Твоето приключение, ред по ред.', description: 'Следи стартирането на играта с отделна конзола, търсене и филтриране на съобщенията.' }
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
