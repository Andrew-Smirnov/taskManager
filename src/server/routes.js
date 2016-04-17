var todosRoutes = require('./todos/routes');
var tasksRoutes = require('./tasks/routes');
var authRoutes = require('./auth/routes');

module.exports = function routes(app) {
	app.use('/tasks', tasksRoutes);
	app.use('/todos', todosRoutes);
	app.use('/auth', authRoutes);
};