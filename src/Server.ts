import { ServerLoader, ServerSettings } from '@tsed/common';
import bodyParser from 'body-parser';
import compression from 'compression';
import expressJwt from 'express-jwt';
import cors from 'cors';
import helmet from 'helmet';
import Path from 'path';
import { connect } from 'mongoose';
import { NotFoundMiddleware } from './middlewares/NotFoundMiddleware';
import { ErrorMiddleware } from './middlewares/ErrorMiddleware';

const rootDir = Path.resolve(__dirname);
@ServerSettings({
  rootDir,
  mount: {
    '/api': `${rootDir}/controllers/**/*.js`
  },
  componentsScan: [
    `${rootDir}/services/**/**.js`,
    `${rootDir}/middlewares/**/**.js`
  ],
  httpPort: 2000
})
export class Server extends ServerLoader {
  async $onInit() {
    let connString = '';
    if (process.env.DB_USER) {
      connString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`;
    } else {
      connString = 'mongodb://localhost/test';
    }
    await connect(
      connString,
      { useNewUrlParser: true }
    );
  }
  async $onMountingMiddlewares() {
    this.use(helmet())
      .use(cors())
      .use(compression())
      .use(
        expressJwt({ secret: process.env.JWT_KEY }).unless({
          path: [
            { url: '/api/courses/withClazzs', method: 'GET' },
            { url: /^\/api\/courses\/withClazzs\/page\/.+/ },
            { url: /^\/api\/auth\/email\/.+\/password\/.+$/, method: 'GET' },
            { url: /^\/api\/users\/email\/.+$/, method: 'GET' },
            { url: /^\/api\/users$/, method: 'POST' }
          ]
        })
      )
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: false }));
  }
  public $afterRoutesInit() {
    this.use(NotFoundMiddleware).use(ErrorMiddleware);
  }
  public $onReady() {
    console.log('Server started...');
  }
  public $onServerInitError(error: any) {
    console.error(error);
  }
}
