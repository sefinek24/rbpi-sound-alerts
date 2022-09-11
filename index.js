require('dotenv').config();

const player = require('play-sound')();
const { checkNetworkStatus } = require('check-network-status');
const { cpuTemperature, cpu } = require('systeminformation');

setInterval(() => {
	checkNetworkStatus({
		timeout: 3000,
		backUpURL: 'https://google.pl',
		pingDomain: 'google.pl',
		method: 'GET',
	}).then(value => {
		if (!value) {
			player.play('sound/chat_message_inbound.wav', err => {
				if (err) throw err;
			});
		}
	});
}, 25000);

setInterval(async () => {
	const temp = await cpuTemperature();

	if (temp.main >= 85) {
		return player.play('sound/battery_critical.wav', err => {
			if (err) throw err;
		});
	}

	if (temp.main >= 80) {
		return player.play('sound/battery_low.wav', err => {
			if (err) throw err;
		});
	}
}, 1500);

setInterval(async () => {
	const cpuUsage = await cpu();

	if (cpuUsage === 100) {
		return player.play('sound/battery_critical.wav', err => {
			if (err) throw err;
		});
	}

	if (cpuUsage >= 80) {
		return player.play('sound/battery_low.wav', err => {
			if (err) throw err;
		});
	}
}, 4500);



if (process.env.NODE_ENV === 'production') process.send('ready');

console.log('Ready.');
player.play('sound/print_complete.wav', err => {
	if (err) throw err;
});