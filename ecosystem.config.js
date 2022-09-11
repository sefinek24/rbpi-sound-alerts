module.exports = {
	apps: [{
		name            : 'rbpi-status',
		script          : './index.js',

		log_date_format : 'HH:mm:ss, DD.MM.YYYY',
		error_file      : '/home/ubuntu/logs/server/rbpi-status/error.log',
		out_file        : '/home/ubuntu/logs/server/rbpi-status/out.log',

		max_restarts          : 3,
		restart_delay         : 10000,
		wait_ready            : true,
	}],
};