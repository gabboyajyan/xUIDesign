'use client'

import { Button } from "../../lib/components/Button"
import { Checkbox } from "../../lib/components/Checkbox"

export default function Home() {
    return (
        <>
            <Button>Button</Button>
            <Checkbox
                onChange={e => console.log(e)}>
                Checkbox
            </Checkbox>
        </>
    )
}