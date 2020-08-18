import { Module } from '@nestjs/common'
import { GoogleController } from './google.controller'
import { GoogleService } from './google.service'
import { GoogleStrategy } from './google.strategy'
import { SessionSerializer } from './session.serializer'

@Module({
    imports: [],
    controllers: [GoogleController],
    providers: [GoogleService, GoogleStrategy, SessionSerializer],
})
export class GoogleModule { }
