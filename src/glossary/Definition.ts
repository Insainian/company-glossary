import { Link } from './Link'
import { UserProfile } from './UserProfile'

export interface DefinitionForm {
    term: string
    meaning: string
    relatedTerms: string
    links: string
}

export interface Definition {
    id?: string
    author: UserProfile
    term: string
    meaning: string
    relatedTerms: string[]
    links: Link[]
}