const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    dbUrl: 'mongodb://localhost/dordoi',
    mongoOptions: {
        useNewUrlParser: true, // Используйте новый парсер URL
        useUnifiedTopology: true, // Используйте новую единую топологию
        // Другие опции, если необходимо
    },
    jwtSecret: 'dordoi-front-backend'
};