export interface EventService {
    action: string, 
    page?: number, 
    size?: number, 
    total?: number, 
    filter?: any, 
    data?: any
}