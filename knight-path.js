const Knight = () => {
    function possibleMoves(x,y){
        const moves = [
            [x + 2, y + 1], [x + 2, y - 1],
            [x - 2, y + 1], [x - 2, y - 1],
            [x + 1, y + 2], [x + 1, y - 2],
            [x - 1, y + 2], [x - 1, y - 1]

        ];

        return moves.filter(([xn, yn]) => xn >= 0 && xn < 8 && yn >= 0 && yn < 8);
    };

    return{
        possibleMoves
    };
};

const Table = () => {
    const cells = new Map();

    const knight = Knight();
    let knightPosition = [0,0];

    for (let x = 0; x < 8; x++){
        for (let y = 0; y < 8; y++){
            let knightMoves = knight.possibleMoves(x,y);
            cells.set(`${x},${y}`, knightMoves);
        }
    }

    // This function gonna move the knight as a normal chess game, the moves are only available if the knight is in the correct position.
    function moveKnight(x,y){
        const currentKey = `${knightPosition[0]},${knightPosition[1]}`;
        const currentAvailabeMoves = cells.get(currentKey);

        if(currentAvailabeMoves.some(([xn,yn]) => xn === x && yn === y)){
            knightPosition = [x,y];
            console.log(`Knight moved to ${x},${y}`);
        }else {
            console.log('Invalid move!')
        }
        // Tested, works well!
    };

    function findShortestPath(initial, final){
        if(!cells.has(`${initial[0]},${initial[1]}`) || !cells.has(`${final[0]},${final[1]}`)){
            console.log('Moves out of range!');
            return -1;
        }

        const visited = new Set();
        let queue = [[initial, [initial]]];
        
        while(queue.length > 0){
            const [current, path] = queue.shift();
            const [x, y] = current;
            const key = `${x},${y}`;

            if(final[0] === x && final[1] === y){

                console.log(`You made it in ${path.length-1} moves! Here's your path: ${JSON.stringify(path)}`);
                return path;
            }

            if(!visited.has(key)){
                visited.add(key);

                const availableMoves = cells.get(key) || [];
                for(const [nextx,nexty] of availableMoves){
                    queue.push([[nextx,nexty], [...path, [nextx, nexty]]]);
                }
            }
            
        }
        // Tested all and should work well
    };

    function getKnightPosition(){
        console.log(knightPosition);
        return knightPosition;
    };

    return {
        moveKnight,
        findShortestPath,
        getKnightPosition,

    };
    
};

const table = Table();
table.moveKnight(1,2);
table.getKnightPosition();
table.moveKnight(8,8);
table.getKnightPosition();
table.findShortestPath([0,0],[3,3]);
table.findShortestPath([0,0],[1,2]);