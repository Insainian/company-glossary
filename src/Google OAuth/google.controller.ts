import { Controller, Get, Post, Request, Req, UseGuards, Redirect } from '@nestjs/common'
import { GoogleService } from './google.service'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'

import { GoogleLoginGuard } from '../common/guards/google-login.guard'

@Controller('google')
export class GoogleController {
    constructor(private readonly googleService: GoogleService) { }
    @Get('login')
    @UseGuards(GoogleLoginGuard)
    async googleAuth(@Req() req) { }

    @Get('redirect')
    @UseGuards(GoogleLoginGuard)
    @Redirect('/glossary/search')
    googleAuthRedirect(@Req() req) { }
}
