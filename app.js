//Starting of app.js file
const express = require('express');
require('dotenv').config();
const sequelize = require('./util/database');

const PORT = process.env.PORT;

const User = require('./models/users');
const ForgotPasswords = require('./models/forgotPasswords');
const Lists = require('./models/lists');
const ListUser = require('./models/listUsers');
const Tasks = require('./models/tasks');

const maninRoute = require('./routes/intro');
const userRoute = require('./routes/user');
const passwordRoutes = require('./routes/password');
const todoRoutes = require('./routes/todo');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use('/user', userRoute);
app.use('/todo', todoRoutes);
app.use('/password', passwordRoutes);
app.use(maninRoute);

// defining databse relations
User.belongsToMany(Lists, { through: ListUser });
Lists.belongsToMany(User, { through: ListUser });

Lists.hasMany(Tasks, { constraints: true, onDelete: 'CASCADE' });
Tasks.belongsTo(Lists);

User.hasMany(ForgotPasswords, { constraints: true });
ForgotPasswords.belongsTo(User);


async function initiate() {
    try {
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server is running at ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}
initiate();



