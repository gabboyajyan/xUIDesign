'use client'

import { Checkbox } from "../components/Checkbox";

export default function Home() {
    return (
        <>
            <Checkbox onClick={(e) => console.log(e)}>Checkbox</Checkbox>
        </>
    )
}