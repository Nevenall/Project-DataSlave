# Project-DataSlave

## Synopsis

A character sheet for Shadowrun: Sixth World.

## Note

This version of the sheet requires a Pro level account with Roll20, in order to utilize custom character sheets.

## Installation

1. Create a game.
2. In the [Game Settings](https://wiki.roll20.net/Game_Management#Game_Settings) page for the game, set the Character Sheet Template to Custom. *(This step may be completed during game creation.)*    
3. In the [Game Settings](https://wiki.roll20.net/Game_Management#Game_Settings) page for the game, select the HTML Layout tab.    
  * Copy the contents of [dataslave.html](./dataslave.html) and paste them into the text box.    
4. In the [Game Settings](https://wiki.roll20.net/Game_Management#Game_Settings) page for the game, select the CSS Styling tab.    
  * Copy the contents of [dataslave.css](./dataslave.css) and paste them into the text box.    
5. In the [Game Settings](https://wiki.roll20.net/Game_Management#Game_Settings) page for the game, select the Translation tab.    
  * Copy the contents of [translation.json](./translation.json) and paste them into the text box.
6. Click the Save Changes button below the text box.
7. Return to the game lobby, and navigate to the [API Scripts](https://wiki.roll20.net/Game_Management#API_Scripts) for the game.
8. Click on the New Script tab. You can give the script any name you like.
9. Copy the contents of [shadowrundice.js](./shadowrundice.js) and paste them into the upper text box.
10. Click the Save Script button below the textbox.

# API Script Specifications
`!shadowtest *adn*|*sdn*|[[*mdn*]]|*aname*|*sname*|*cname*|*special*`

shadowtest takes 6 (optionally 7) parameters, separated by pipe (|) characters. 

* Attribute Dice Number: Integer
* Skill Dice Number: Integer
* Modifier Dice Number: Roll20 Dice Result  [[Integer]]
* Attribute Name: String
* Skill Name: String
* Character Name: String
* Special (**optional**): Either the letter Y, the letter N, or a number (usually 2 or 3). 
** Y means the roll is a skill roll that can be attempted without training. 
** N means it is a skill roll that cannot be attempted without training (which will then abort the roll if Skill Dice Number is 0). 
** 2 or 3 is how I handle the Specialisms and Expertises. This is tacked on to the Modifier Dice Number.

`!shadowgremlin *name*`

shadowgremlin will roll 2d6 and apply the Gremlins rule to it. The parameter (name) is used to give a name on the roll.

VVC: A Verification Script has been loaded into all components of the sheet. If all four components of the sheet have been installed correctly, upon clicking the Update VVC button on any character sheet, the value specified in the release (at time of launch, this value is "2BBB") will appear in the text box.
