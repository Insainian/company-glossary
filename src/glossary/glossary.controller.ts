import { Body, Controller, Get, Param, Post, Query, Render, UseGuards, Request, UseFilters } from '@nestjs/common'
import { Definition, DefinitionForm } from './Definition'
import { GoogleService } from 'src/Google OAuth/google.service'
import { SearchResults } from './SearchResults'
import { SearchService } from 'src/search/search.service'
import { AuthenticatedGuard } from '../common/guards/authenticated.guard'
import { AuthExceptionFilter } from 'src/common/filters/auth-exception.filter'
import { UserProfile } from './UserProfile'

type Result = { success: boolean }
type User = { user: UserProfile }

function getUser(req: any): User {
    return {
        user: getUserProfile(req)
    }
}

function getUserProfile(req: any): UserProfile {
    return {
        name: req.user.displayName || req.user.email,
        email: req.user.email,
        picture: req.user.picture
    }
}

@Controller('glossary')
@UseFilters(AuthExceptionFilter)
export class GlossaryController {
    constructor(private readonly searchService: SearchService, private readonly googleService: GoogleService) { }

    @Get()
    @Render('glossary/glossary')
    getHomePage() { }

    @Get('search')
    @UseGuards(AuthenticatedGuard)
    @Render('glossary/search')
    async getSearchPage(@Request() req, @Query('q') q: string): Promise<User & SearchResults> {
        return {
            ...getUser(req),
            query: q,
            definitions: await this.searchService.getDefinitionList(q)
        }
    }

    @Get('definition/:id')
    @UseGuards(AuthenticatedGuard)
    @Render('glossary/show_definition')
    async getViewDefinitionPage(@Request() req, @Param() params): Promise<User & Definition> {
        const definition = await this.searchService.getDefinition(params.id)
        return {
            ...getUser(req),
            ...definition
        }
    }

    @Post('definition/:id/delete')
    @UseGuards(AuthenticatedGuard)
    @Render('glossary/deleted')
    async deleteDefinition(@Request() req, @Param() params): Promise<User> {
        await this.searchService.deleteDefinition(params.id)
        return getUser(req)
    }

    @Get('add')
    @UseGuards(AuthenticatedGuard)
    @Render('glossary/add_definition')
    getAddDefinitionPage(@Request() req): User {
        return getUser(req)
    }

    @Post('add')
    @UseGuards(AuthenticatedGuard)
    @Render('glossary/added_definition')
    async addDefinition(@Request() req, @Body() definitionForm: DefinitionForm): Promise<Result & Definition & User> {
        const definition: Definition = {
            author: getUserProfile(req),
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
        return {
            success: await this.searchService.addDefinition(definition),
            ...getUser(req),
            ...definition
        }
    }
}
