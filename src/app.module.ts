import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { GlossaryModule } from './glossary/glossary.module'
import { SearchModule } from './search/search.module'
import { GoogleModule } from './Google OAuth/google.module'

@Module({
  imports: [UserModule, GlossaryModule, SearchModule, GoogleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
