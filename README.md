

#Planning Document found here 
https://trello.com/b/zde6mtXS/uno-copy-remix

The idea of this game comes from the way I grew up playing the game so I want to work on this game and build it so I can play it how I want to  online. It has been said that some of the things I am going to implement goes against the classic game's rules. This maybe true which is why I am creating it. If you go against the normal rules  then you can't find a place to play online.   

#Project Start Date 
July 12 2019.  

#Projected Completion
Unknown... 

There is a serious amount of logic to coding up the regular game. With the ability to play multiple cards each time around for each user the logic gets even more complex. This is actually the main reason I wanted to code this. Outside of playing with friends I think this is a nice challege. 



#Game Rules  

Unlike the traditional classic game Uno  this game is played allowing the player to defend themselves. Uno recently stated that their game doesn't allow for placing draws on top of each other.   So me and my friends many years ago have always played the game allowing for stacks.    Instead of a one card a play game you could if you have the cards   virtually unload them are. 

Stacks  

- You can stack a draw 4 on top of a draw 4. 
- You can also stack a draw 2 on top of a draw 2. 
- You can also stack a draw 4 on top of a draw 2. 
- You can also stack a draw 2 on top of a draw 4. 
- The amount to draw is carried over to the next player.  Until someone picks up by choice or doesn't have a draw to defend themselves. 

- You can stack unlimited amount of the same card     2 2 2 2 2   can all be played if you have the cards. 
- other examples   4  4 4 4    or  Reverse Reverse Reverse   or Skip Skip  or two WILDS  or even two draw 4's or a combination of draw 4 and draw 2's.     


count ups or count downs  
-  you can count as long as you have three distinct numbers  for example 
-  4 5 5 5 6 6  7
-  The above might have been confusing because it allows you to stack as well as count but   4 (one) 5 (two)  6(three)  the 7 would make (four) distinct numbers. 
-  You can not count   4 5 5 5  even if the card on top of the pile is a 3.   The three distinct numbers must come from the player playing. Failure to adhre to this rule results in a lost of turn and an automatic penalty of two cards adde to that players hand. 
-  0 can count as 0 or 10     9 0 1     works.   or even  0 9 8  works   counting down   again as long as there is three distinct numbers in your play it will work. You cannot add in other numbers that are not linked to a count.   Reverse wild draw 4 draw 2 skip cards are not apart of count up and count down plays. 
-  This rule comes from the fact in a pretty sizeable game a person coul pick up 14 or more cards  if they are actively thinking they can unload many of these cards rather quickly to get back in the game but have to be alert. Remember  failure to do so will result in a lost of turn and an automatic pick up of 2 cards.   

calling uno or one  or whatever key phrase you like to call.  
-Basically you have to make it known that you have one card left.   Failure to do so results in a penalty if another player calls you out on this.  The penalty is 2 cards.  Basic rule  call uno  as you are placing your card on the table and you are about to have one card. If you know it   call it. 

With these rules  it makes programming this game very complex as the logic is huge.  I am up to the task and I think it should be alot of fun.   I will add to this if there are any rules that I have left out accidently. But functionality to allow a person to call one card left pick colors when they place cards down and the numerous scenarios of cards that can be played by each individual player is enough to focus on at this time. Currently at this commit I have the game working I have tested a three player game where I have the control for each player.   

Thats not the idea  but once the logic is complete I will hook up a way to login via Auth0 and a backend.   This should be a multiplayer game that someone can login to and play with against a pal or pals. Again the logic in itself is a lot to work so the logic is what I am addressing first. Once that is bug free I'll start hooking up the other parts.  While I can play a full game it is not without bugs. My first pass solution isn't very dry in code or organize. But thats how I plan. I jot things down set up a trello board  make a few repl.its code out out my idea and then improve upon it. As of this commit I am coming up with a new method for checking for valid moves  DRY and more organized code as I have ran into some bugs that I feel could be avoided based off these new methods.