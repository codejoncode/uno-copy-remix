import React from 'react'
import Card from './Card';

const MainBoard = ({topCard}) => {
    if (topCard){
        return (
            <div style = {{margin: "auto 0"}}>
                <Card card = {topCard}/>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default MainBoard;
