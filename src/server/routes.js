var todosRoutes = require('./todos/routes');
var tasksRoutes = require('./tasks/routes');
var authRoutes = require('./auth/routes');
var userProfile = require('./user-profile/routes');
var shareRoutes = require('./share/routes');

module.exports = function routes(app) {
	app.use('/tasks', tasksRoutes);
	app.use('/todos', todosRoutes);
	app.use('/auth', authRoutes);
	app.use('/user-profile', userProfile);
	app.use('/share', shareRoutes);
};