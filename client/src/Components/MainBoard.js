import React from 'react'
import Card from './Card';

const MainBoard = ({topCard}) => {
    if (topCard){
        return (
            <div>
                <Card card = {topCard}/>
            </div>
        )
    }

}

export default MainBoard;
