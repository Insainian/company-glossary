import { Body, Controller, Get, Param, Post, Query, Render, Redirect } from '@nestjs/common'
import { Definition, DefinitionForm } from './Definition'
import { SearchResults } from './SearchResults'
import { SearchService } from 'src/search/search.service'
import { getDefaultSettings } from 'http2'
import baseModule from 'hbs'

@Controller('glossary')
export class GlossaryController {
    constructor(private readonly searchService: SearchService) { }
    @Get()
    @Redirect('glossary/search')
    getHomePage() { }

    @Get('search')
    @Render('glossary/search')
    async getSearchPage(@Query('q') q: string): Promise<SearchResults> {
        return {
            query: q,
            definitions: await this.searchService.getDefinitionList(q)
        }
    }

    @Get('definition/:id')
    @Render('glossary/show_definition')
    async getViewDefinitionPage(@Param() params): Promise<Definition> {
        return this.searchService.getDefinition(params.id)
    }

    @Post('definition/:id/delete')
    @Render('glossary/deleted')
    async deleteDefinition(@Param() params) {
        this.searchService.deleteDefinition(params.id)
    }

    @Get('add')
    @Render('glossary/add_definition')
    getAddDefinitionPage() { }

    @Post('add')
    @Render('glossary/added_definition')
    addDefinition(@Body() definitionForm: DefinitionForm): Definition {
        const definition: Definition = {
            term: definitionForm.term,
            meaning: definitionForm.meaning,
            relatedTerms: definitionForm.relatedTerms.split(',').map(term => term.trim()),
            links: definitionForm.links.split(',').map((linkUrl) => {
                return {
                    title: '',
                    url: linkUrl.trim()
                }
            })
        }
        this.searchService.addDefinition(definition)
        return definition
    }
}
