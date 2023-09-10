const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

// Определение схемы для пользователя
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      // Пользовательская валидация для проверки уникальности имени пользователя
      validator: async function(value) {
        if (!this.isModified('username')) return; // Проверка, если имя пользователя не было изменено
        const user = await User.findOne({username: value});
        if (user) throw new Error(); // Если найден пользователь с таким именем, выбрасываем ошибку
      },
      message: 'This username is already taken '
    }
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['admin', 'user']
  },
  image: {
    type: String
  }

});

// Метод для проверки пароля
UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

// Метод для генерации токена
// UserSchema.methods.generateToken = function() {
//   this.token = nanoid();
// };

// Middleware, выполняющийся перед сохранением пользователя
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Если пароль не изменен, переходим к следующему middleware

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR); // Генерация соли
  const hash = await bcrypt.hash(this.password, salt); // Хеширование пароля

  this.password = hash; // Заменяем пароль на хеш

  next(); // Переходим к следующему middleware
});

// Преобразование объекта пользователя перед отправкой JSON
UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password; // Удаляем пароль из JSON-представления объекта пользователя
    return ret;
  }
});

// Создание модели пользователя на основе схемы
const User = mongoose.model('User', UserSchema);

module.exports = User; // Экспорт модели пользователя
