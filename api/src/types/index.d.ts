
export type TRoom = {
    room: string
    code: string
}

export type TWord = {
    word: string,
    count: number
}

export type TMessage = {
    socketid: string,
    username: string,
    message: string,
    timestamp?: string
}
