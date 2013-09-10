var firstNames, lastNames, api;

firstNames = [
  'Dan',
  'Dave',
  'Matt',
  'Scott',
  'Mark',
  'Alex',
  'Tim',
  'Jackie',
  'Jess',
  'Jenn',
  'Sarah',
  'Sean',
  'Jaclyn',
  'Greg',
  'Anthony',
  'Shannon',
  'Lynn',
  'Alison',
  'Clement',
  'Mell',
  'Nannette',
  'Malcolm',
  'Matias',
  'Zach',
  'Caitlin',
  'Jocelyn',
  'Oscar',
  'Darth',
  'Luke',
  'Leia',
  'Han',
  'Anakin',
  'Lando',
  'Wedge',
  'Jango'
];

lastNames = [
  'Chan',
  'Stein',
  'Latten',
  'LeBrun',
  'Belsky',
  'Balzer',
  'Bowzer',
  'Skywalker',
  'Vader',
  'Jones',
  'Smith',
  'Orozco',
  'Rapp',
  'Faydi',
  'Geli',
  'Krug',
  'Thornsberry',
  'Traytel',
  'Henry',
  'Lee',
  'Green',
  'Fahl',
  'Garfinkel',
  'Grechka',
  'Doherty',
  'Hoover',
  'Aversano',
  'Picciano'
]

function firstName() {
  return firstNames[Math.floor(Math.random() * firstNames.length)];
}

function lastName() {
  return lastNames[Math.floor(Math.random() * lastNames.length)];
}

function unix() {
  return new Date().getTime();
}

function email() {
  return firstName() + lastName() + unix() + '@behanced.com';
}

function username() {
  return firstName() + unix();
}

api = {
  email: email,
  firstName: firstName,
  lastName: lastName,
  username: username
};

module.exports = api;