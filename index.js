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
		if (temp.main >= 85) {
			playSound('sound/battery_critical.wav');
		} else if (temp.main >= 80) {
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