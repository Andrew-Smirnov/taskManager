var todosRoutes = require('./todos/routes');
var tasksRoutes = require('./tasks/routes');

module.exports = function routes(app) {
	app.use('/tasks', tasksRoutes);
	app.use('/todos', todosRoutes);
};