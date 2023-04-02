require('dotenv').config({ path: '.env' });
import * as express from 'express';
import 'express-async-errors';
import { static as expressStatic, urlencoded } from 'express';
import { engine } from 'express-handlebars';
import * as methodOverride from 'method-override';
import { homeRouter } from './routers/home';
import { workerRouter } from './routers/worker';
import { adminRouter } from './routers/admin';
import { handlebarsHelpers } from './utils/handlebars-helpers';

import './config/db';
import { handleError } from './utils/errors';
import { supportRouter } from './routers/support';

// dotenv.config({ path: '/.env' }) - doesn't work
const app = express();

app.use(methodOverride('_method'));
app.use(
	urlencoded({
		extended: true,
	})
);
app.use(expressStatic('public'));
app.engine(
	'.hbs',
	engine({
		extname: '.hbs',
		helpers: handlebarsHelpers,
	})
);

app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/admin', adminRouter);
app.use('/worker', workerRouter);
app.use('/support', supportRouter);
app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
	console.log('Server is listening on http://localhost:3001');
});

