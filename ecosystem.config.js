module.exports = {
	apps: [{
		name            : 'rbpi-status',
		script          : './client/index.js',

		log_date_format : 'HH:mm:ss, DD.MM.YYYY',
		error_file      : '/home/ubuntu/logs/server/rbpi-status/error.log',
		out_file        : '/home/ubuntu/logs/server/rbpi-status/out.log',

		max_restarts          : 7,
		restart_delay         : 7000,
		shutdown_with_message : true,
		wait_ready            : true,
	}],
};