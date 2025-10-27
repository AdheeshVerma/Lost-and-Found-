import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();

// Security headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Gzip compression
app.use(compression());

// HTTP request logger
app.use(morgan('combined'));

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

export { app, PORT };
