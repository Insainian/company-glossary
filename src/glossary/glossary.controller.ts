import { Body, Controller, Get, Param, Post, Query, Render, Redirect, Req, UseGuards, Request, UseFilters } from '@nestjs/common'
import { Definition, DefinitionForm } from './Definition'
import { GoogleService } from 'src/Google OAuth/google.service'
import { SearchResults } from './SearchResults'
import { SearchService } from 'src/search/search.service'
import { getDefaultSettings } from 'http2'
import baseModule from 'hbs'
import { Response } from 'express'

import { AuthenticatedGuard } from '../common/guards/authenticated.guard'
import { AuthExceptionFilter } from 'src/common/filters/auth-exception.filter'

@Controller('glossary')
@UseFilters(AuthExceptionFilter)

export class GlossaryController {
    constructor(private readonly searchService: SearchService, private readonly googleService: GoogleService) { }

    @Get()
    getHomePage() {
        return 'WELCOME'
    }

    @Get('search')
    @UseGuards(AuthenticatedGuard)
    @Render('glossary/search')
    async getSearchPage(@Query('q') q: string): Promise<SearchResults> {
        return {
            query: q,
            definitions: await this.searchService.getDefinitionList(q)
        }
    }

    @Get('definition/:id')
    @UseGuards(AuthenticatedGuard)
    @Render('glossary/show_definition')
    async getViewDefinitionPage(@Param() params): Promise<Definition> {
        return this.searchService.getDefinition(params.id)
    }

    @Post('definition/:id/delete')
    @UseGuards(AuthenticatedGuard)
    @Render('glossary/deleted')
    async deleteDefinition(@Param() params) {
        this.searchService.deleteDefinition(params.id)
    }

    @Get('add')
    @UseGuards(AuthenticatedGuard)
    @Render('glossary/add_definition')
    getAddDefinitionPage() { }

    @Post('add')
    @UseGuards(AuthenticatedGuard)
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
