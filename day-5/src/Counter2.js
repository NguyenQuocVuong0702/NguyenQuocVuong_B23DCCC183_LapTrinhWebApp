import { useState } from 'react';

function Counter2() {
    const [count, setCount] = useState(0);

    const handleClickMe = () => {
        setCount(count + 1);
    }

    return (
        <>
            <p>Counter 2</p>
            <p>Bạn đã click {count} lần</p>
            <button onClick={handleClickMe}>Click me !</button>
        </>
    )
}

export default Counter2;


