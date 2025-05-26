// Styles
import dynamic from 'next/dynamic';
import './styles/global.css';

// const Button = dynamic(() => import('@/components/Button/Button'), {
//     ssr: false,
// });

const Checkbox = dynamic(() => import('@/components/Checkbox/Checkbox'), {
    ssr: false,
});

export {
    // Button,
    Checkbox
}

// Components
// export { default as Button } from "@/components/Button/Button";
// export { default as Checkbox } from '@/components/Checkbox/Checkbox';