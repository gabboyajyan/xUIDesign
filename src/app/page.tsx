import { useRef, useEffect } from 'react';
import Input from '../../lib/components/Input/Input';

export default function Home() {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            console.log(ref.current);
            
            ref.current?.focus()
        }
    }, []);

    return (
        <div>
            <Input ref={ref} mask="___.___.___-__" />
        </div>
    )
}

