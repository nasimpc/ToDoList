//Starting of app.js file
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const PORT = process.env.PORT;

const User = require('./models/users');
const Forgotpasswords = require('./models/forgotpasswords');
const Lists = require('./models/lists');
const Tasks = require('./models/tasks');

const maninRoute = require('./routes/intro');
const userRoute = require('./routes/user');
const passwordRoutes = require('./routes/password');
const todoRoutes = require('./routes/todo');

const app = express();
app.use(bodyParser.json({ extended: false }));
app.use(express.static('public'));

app.use('/user', userRoute);
app.use('/todo', todoRoutes);
app.use('/password', passwordRoutes);
app.use(maninRoute);

// defining databse relations
Lists.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Lists);
Tasks.belongsTo(Lists, { constraints: true, onDelete: 'CASCADE' });
Lists.hasMany(Tasks);
Forgotpasswords.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Forgotpasswords);

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