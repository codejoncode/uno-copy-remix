const playersLeft = (playersArray) => {
    /**
     * playersArray will need to know the player name and or how many cards they have 
     */
    let stillPlaying = 0; 
    for (let index = 0; index < playersArray.length; index ++)
    {
        if (playersArray[index].cardsLeft > 0)
        {
            stillPlaying += 1; 
        }
    }
    return stillPlaying; 
}

export default playersLeft; 