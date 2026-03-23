const TEAM_KEY = 'teamNames';

const elements = {
  nameInput: document.getElementById('nameInput'),
  team1List: document.getElementById('team1List'),
  team2List: document.getElementById('team2List'),
  team1Btn: document.getElementById('team1Btn'),
  team2Btn: document.getElementById('team2Btn'),
  saveBtn: document.getElementById('saveBtn'),
  clearBtn: document.getElementById('clearBtn')
};

let selectedTeam = 'team1';
let teams = {team1: [], team2: []};

function loadTeams() {
  const data = localStorage.getItem(TEAM_KEY);
  if (!data) return;

  try {
    const parsed = JSON.parse(data);
    teams.team1 = Array.isArray(parsed.team1) ? parsed.team1 : [];
    teams.team2 = Array.isArray(parsed.team2) ? parsed.team2 : [];
  } catch (e) {
    teams = {team1: [], team2: []};
    console.warn('Не удалось прочитать данные команд из localStorage', e);
  }
}

function saveTeams() {
  localStorage.setItem(TEAM_KEY, JSON.stringify(teams));
}

function renderTeams() {
  elements.team1List.innerHTML = '';
  elements.team2List.innerHTML = '';

  teams.team1.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    elements.team1List.appendChild(li);
  });

  teams.team2.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    elements.team2List.appendChild(li);
  });
}

function setActiveTeam(team) {
  selectedTeam = team;
  elements.team1Btn.classList.toggle('active', team === 'team1');
  elements.team2Btn.classList.toggle('active', team === 'team2');
}

function addName() {
  const name = elements.nameInput.value.trim();
  if (!name) return alert('Введите имя.');

  if (selectedTeam === 'team1') teams.team1.push(name);
  else teams.team2.push(name);

  elements.nameInput.value = '';
  saveTeams();
  renderTeams();
}

function clearAll() {
  if (!confirm('Удалить все сохранённые данные?')) return;
  teams = {team1: [], team2: []};
  saveTeams();
  renderTeams();
}

// События
elements.team1Btn.addEventListener('click', () => setActiveTeam('team1'));
elements.team2Btn.addEventListener('click', () => setActiveTeam('team2'));
elements.saveBtn.addEventListener('click', addName);
elements.clearBtn.addEventListener('click', clearAll);

loadTeams();
setActiveTeam('team1');
renderTeams();