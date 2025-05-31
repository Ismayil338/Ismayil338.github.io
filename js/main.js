async function loadData() {
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang') === 'ru' ? 'ru' : 'en';
  const page = urlParams.get('page') || 'open-source';

  const response = await fetch('./data.json');
  const data = await response.json();

  const container = document.getElementById('softwareGrid');
  container.innerHTML = ''; // clear previous

  const filteredApps = data.filter(app => app.pages.includes(page));
  const title = document.getElementById('page-title');

  // Set page title dynamically
  const pageTitles = {
    'open-source': lang === 'ru' ? 'Приложения с открытым исходным кодом' : 'Open Source Apps',
    'forwin8': lang === 'ru' ? 'Приложения для Windows 7/8' : 'Apps for Windows 7/8',
    'not-in-winget': lang === 'ru' ? 'Не найдены в winget' : 'Not in Winget',
    'proprietary': lang === 'ru' ? 'Проприетарные приложения' : 'Proprietary Apps',
    'archive': lang === 'ru' ? 'Архив' : 'Archive'
  };

  title.textContent = pageTitles[page] || 'Apps';

  filteredApps.forEach(app => {
    const div = document.createElement('div');
    div.className = 'software-item';

    const a = document.createElement('a');
    a.href = app.link;
    if (app.link.startsWith('http')) a.target = '_blank';

    const img = document.createElement('img');
    img.src = app.image || 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Breezeicons-places-32-folder-yellow.svg';
    img.alt = '';

    const p = document.createElement('p');
    p.textContent = lang === 'ru' ? app['title-ru'] : app.title;

    a.appendChild(img);
    a.appendChild(p);
    div.appendChild(a);
    container.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', loadData);
