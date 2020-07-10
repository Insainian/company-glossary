import { Link } from './Link'

export interface DefinitionForm {
    term: string
    meaning: string
    relatedTerms: string
    links: string
}

export interface Definition {
    term: string
    meaning: string
    relatedTerms: string[]
    links: Link[]
}