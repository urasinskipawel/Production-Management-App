import * as express from 'express';
import 'express-async-errors';
import { static as expressStatic, urlencoded } from 'express';
import { engine } from 'express-handlebars';
import * as methodOverride from 'method-override';

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

app.get('/', (req, res) => {
	res.send('Hello world');
});

//app.use(handleError)

app.listen(3000, 'localhost', () => {
	console.log('Server is listening on ...');
});
