
export type TRoom = {
    room: string
    code: string
    rounds?: number,
    timer?: number,
    words?: string[]
}

export type TWord = {
    word: string,
    count: number
}

export type TMessage = {
    socketid: string,
    username: string,
    message: string,
    status?: boolean
}
