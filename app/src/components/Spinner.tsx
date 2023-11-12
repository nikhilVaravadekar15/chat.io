import {
    Loader2
} from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
    color?: string
    classname?: string
}

export default function Spinner({ color, classname }: Props) {
    return (
        <div className="flex items-center justify-center">
            <Loader2
                color={color ? color : "#0096ff"}
                className={cn(
                    "h-12 w-12 animate-spin", classname
                )}
            />
        </div>
    )
}
