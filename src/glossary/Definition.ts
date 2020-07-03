import { Link } from './Link'

export interface Definition {
    term: string
    meaning: string
    relatedTerms: string[]
    links: Link[]
}