import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { AppModule } from './app.module'
import * as hbs from 'hbs'

import * as session from 'express-session'
import flash = require('connect-flash')
import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useStaticAssets(join(__dirname, 'public'))
  app.setBaseViewsDir(__dirname)
  app.setViewEngine('hbs')

  hbs.registerPartials(join(__dirname, 'partials'))

  hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this)
  })


  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  )

  app.use(passport.initialize())
  app.use(passport.session())
  app.use(flash())

  await app.listen(3000)
}
bootstrap()
