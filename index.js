require('dotenv').config();

const player = require('play-sound')();
const { checkNetworkStatus } = require('check-network-status');
const { cpuTemperature } = require('systeminformation');

const playSound = soundPath => {
	player.play(soundPath, err => {
		if (err) console.error(err);
	});
};

const checkAndPlayNetworkStatusSound = async () => {
	try {
		const isConnected = await checkNetworkStatus({
			timeout: 3000,
			backUpURL: 'https://google.com',
			pingDomain: 'google.com',
			method: 'GET',
		});
		if (!isConnected) {
			playSound('sound/chat_message_inbound.wav');
		}
	} catch (error) {
		console.error('Error checking network status:', error);
	}
};

const checkAndPlayTemperatureSound = async () => {
	try {
		const temp = await cpuTemperature();

		// To be honest, I don't know what the maximum temperatures are for Raspberry Pi 4.
		if (temp.main >= 82) {
			playSound('sound/battery_critical.wav');
		} else if (temp.main >= 70) {
			playSound('sound/battery_low.wav');
		}
	} catch (error) {
		console.error('Error checking CPU temperature:', error);
	}
};


setInterval(checkAndPlayNetworkStatusSound, 25000);
setInterval(checkAndPlayTemperatureSound, 1500);

if (process.env.NODE_ENV === 'production') {
	process.send('ready');
} else {
	playSound('sound/print_complete.wav');
}

console.log('Ready.');