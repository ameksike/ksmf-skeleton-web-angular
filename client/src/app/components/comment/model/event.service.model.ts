export interface EventService {
    action: string, 
    page?: number, 
    size?: number, 
    total?: number, 
    filter?: string[][], 
    sort?: string[][], 
    data?: any
}