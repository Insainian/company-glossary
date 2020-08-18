import { Module } from '@nestjs/common'
import { GlossaryController } from './glossary.controller'
import { SearchModule } from 'src/search/search.module'
import { GoogleService } from 'src/Google OAuth/google.service'
import { GoogleStrategy } from 'src/Google OAuth/google.strategy'

@Module({
    imports: [SearchModule, GoogleService, GoogleStrategy],
    controllers: [GlossaryController],
    providers: [GoogleService]
})
export class GlossaryModule { }
