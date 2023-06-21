let songs = [];
const bands = ['AC/DC', 'Imagine Dragons', 'Metallica', 'Skillet'],
	genres = ['Rock', 'Funk', 'Beats', 'Hip Hop', 'Pop', 'Rap'],
	songsList = ['One More Time', 'Aerodynamic', 'Digital Love', 'Let There Be Rock'],
	countries = ['USA', 'UK', 'UA', 'PL', 'UAE', 'JP'];

function getRandomValue(array) {
	return array[Math.floor(Math.random() * array.length)];
}

for (let i = 1; i <= 48; i++) {
	songs.push({
		id: i,
		favorite: false,
		img: `public/img/songs/list/song${i}.jpeg`,
		song: getRandomValue(songsList),
		band: getRandomValue(bands),
		year: Math.floor(Math.random() * (2030 - 1950)) + 1950,
		style: [getRandomValue(genres)],
		country: getRandomValue(countries),
		added: false
	});
}

if (!localStorage.getItem('songs')) {
	localStorage.setItem('songs', JSON.stringify(songs));
	localStorage.setItem('perPage', '6');
}