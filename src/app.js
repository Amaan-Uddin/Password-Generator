const range = document.getElementById('length');
const rangeValue = document.getElementById('rangeVal');
const switches = document.querySelectorAll('input[role=switch]');
const generateButton = document.getElementById('generate');
const password = document.getElementById('password');

range.addEventListener('input', (e) => {
	rangeValue.innerText = e.target.value;
	rangeValue.dataset.range = e.target.value;
});

const category = {
	lower: 'abcdefghijklmnopqrstuvwxyz',
	upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	number: '1234567890',
	symbol: '!@#$%/|&*+-_=[]{}()?<>,.:;~',
	unique: '',
};

const uniqueArray = [
	'aA@4',
	'bB68',
	'cCeo',
	'dD',
	'eEc3',
	'fFpP?',
	'gG8',
	'hH#',
	'iI1lL!',
	'jJ7i*',
	'kKR',
	'mMNn',
	'oO0Q',
	'qQ9',
	'rRK',
	'sS$5&',
	'tTI1f',
	'uU',
	'wWvV',
	'xXyY',
	'zZ2',
	'[]{}()<>',
	',.',
	':;',
	'%/|',
	'+=-_~',
];

const optionSet = new Set();
let uniqueFlag = 0;

optionSet.add(category.lower);
switches.forEach((Switch) => {
	Switch.addEventListener('click', (e) => {
		if (e.target.checked) {
			if (e.target.dataset.value == 'unique') uniqueFlag = 1;
			optionSet.add(category[e.target.dataset.value]);
		} else {
			if (e.target.dataset.value == 'unique') uniqueFlag = 0;
			optionSet.delete(category[e.target.dataset.value]);
		}
		console.log(optionSet);
		console.log(uniqueFlag);
	});
});

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

generateButton.addEventListener('click', () => {
	let characterString = Array.from(optionSet).join('');
	let characterRange = rangeValue.dataset.range;
	let passwordString = '';

	console.log(characterString);

	while (characterRange) {
		const randomIndex = getRandomNumber(0, characterString.length);

		if (!uniqueFlag) {
			passwordString += characterString[randomIndex];
			characterRange--;
		} else {
			const randomChar = characterString[randomIndex];
			passwordString += randomChar;

			const subString = uniqueArray.find((substring) => {
				return substring.includes(randomChar);
			});

			Array.from(subString).forEach((character) => {
				characterString = characterString.replace(character, '');
			});

			characterRange--;
		}
	}
	password.value = passwordString;
});
