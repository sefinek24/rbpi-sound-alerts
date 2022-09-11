const player = require('play-sound')();
const { checkNetworkStatus } = require('check-network-status');
const { cpuTemperature } = require('systeminformation');

player.play('sound/print_complete.wav', err => {
	if (err) throw err;
});

setInterval(() => {
	checkNetworkStatus({
		timeout: 3000,
		backUpURL: 'https://google.pl',
		pingDomain: 'google.pl',
		method: 'GET',
	}).then(value => {
		if (value) {
			console.log('OK');
		} else {
			player.play('sound/chat_message_inbound.wav', err => {
				if (err) throw err;
			});
		}
	});
}, 5000);

setInterval(async () => {
	const temp = await cpuTemperature();
	console.log(temp);
}, 2000);