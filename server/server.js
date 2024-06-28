const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config();

connectDB();

app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

const authRouter = require('./routes/auth');
const journalRouter = require('./routes/journal');
const resourcesRouter = require('./routes/resources');
const forumRouter = require('./routes/forum');

app.use('/api/auth', authRouter);
app.use('/api/journal', journalRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/forum', forumRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
