import * as express from 'express';
import 'express-async-errors';
import { static as expressStatic, urlencoded } from 'express';
import { engine } from 'express-handlebars';
import * as methodOverride from 'method-override';
import { homeRouter } from './routers/home';
import { workerRouter } from './routers/worker';
import { adminRouter } from './routers/admin';

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
		//helpers: ...
	})
);

app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/admin', adminRouter);
app.use('/worker', workerRouter);
//app.use(handleError)

app.listen(3001, '0.0.0.0', () => {
	console.log('Server is listening on http://localhost:3001');
});
