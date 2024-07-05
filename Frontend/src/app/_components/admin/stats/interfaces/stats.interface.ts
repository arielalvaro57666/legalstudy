export interface IStats {
    chatsCount: IChatsCount | undefined
    todayVisits: ITodayVisits | undefined
    totalVisits: ITotalVisits | undefined
}

export interface ITodayVisits {
    date: string
    visited: number
}

export interface ITotalVisits {
    total: number
}

export interface IChatsCount {
    chats_on: number 
    chats_off: number
}