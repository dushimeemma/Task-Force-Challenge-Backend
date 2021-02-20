import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../task-force-api-docs.json';

config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);
app.use('/api/docs', swaggerUi.serve);
app.get('/api/docs', swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Task Force Backend Challenge',
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
  });
});

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
