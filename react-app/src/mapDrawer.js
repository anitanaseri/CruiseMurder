myMap =
    [
        ["^", "|", "=", "=", "=", "=", "|", "^"],
        ["^", "|", "D", "=", "=", "=", "|", "^"],
        ["^", "|", "=", "=", "=", "=", "|", "^"],
        ["^", "|", "P", "=", "=", "e", "|", "^"],
        ["^", "|", "=", "=", "=", "=", "|", "^"],
        ["^","\\", "=", "=", "E", "=", "/", "^"],
        ["^", "^", "_", "_", "_", "_", "^", "^"],
        ["^", "^", "^", "^", "^", "^", "^", "^"]
    ]

function drawMap(playerX, playerY)
{
    outputString = ""

    for (let y = 0; y < myMap.length; y++) {
        for (let x = 0; x < myMap[y].length; x++) {
            if (x == playerX && y == playerY) {
                outputString += "@"
            }
            else {
                outputString += myMap[y][x]
            }
        }
        outputString += "\n"
    }

    return outputString
}
