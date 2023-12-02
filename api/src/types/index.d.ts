
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
