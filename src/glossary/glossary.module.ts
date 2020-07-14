import { Module } from '@nestjs/common'
import { GlossaryController } from './glossary.controller'
import { SearchModule } from 'src/search/search.module'

@Module({
    imports: [SearchModule],
    controllers: [GlossaryController]
})
export class GlossaryModule { }
