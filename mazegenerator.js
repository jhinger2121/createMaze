let grid = [];

function kruskals() {
    // 1 create each cell as a set. done
    // 2 create list of walls. done 
    // 3 pick random wall from list. done
    //    1 if the cells divided by the wall are disjoint set
    //       1 remove the wall 
    //       2 join the devided cell into single set

    this.setup = function () {
        // creates each cell as a set
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let cell = new Cell(row, col)
                let arr = [cell]
                grid.push(arr);
            }
        }

        // creates list of walls
        for (let i = 0; i < grid.length; i++) {
            //top
            let top = grid[index(grid[i][0].row - 1, grid[i][0].col)]
            if (top && !top[0].active_wall[2]) {
                let cell = [grid[i][0].row, grid[i][0].col, 'top']
                grid[i][0].active_wall[0] = true;
                wall.push(cell)
            }
            //right
            let right = grid[index(grid[i][0].row, grid[i][0].col + 1)]
            if (right && !right[0].active_wall[3]) {
                let cell = [grid[i][0].row, grid[i][0].col, 'right']
                grid[i][0].active_wall[1] = true;
                wall.push(cell)
            }
            //bottom
            let bottom = grid[index(grid[i][0].row + 1, grid[i][0].col)]
            if (bottom && !bottom[0].active_wall[0]) {
                let cell = [grid[i][0].row, grid[i][0].col, 'bottom']
                grid[i][0].active_wall[2] = true;
                wall.push(cell)
            }
            //left
            let left = grid[index(grid[i][0].row, grid[i][0].col - 1)]
            if (left && !left[0].active_wall[1]) {
                let cell = [grid[i][0].row, grid[i][0].col, 'left']
                grid[i][0].active_wall[3] = true;
                wall.push(cell)
            }
        }
        console.log(grid, wall)
    }
    this.beggin = function () {
        wall = wall[randomNo(wall.length)];
        console.log(wall);
    }

}

function Prims() {
    // stage 1
    // create cell objects and store in a array
    // pick a random cell and find its adjacent cell
    // then make list of adjacent cell name: neighbouring

    // stage 2
    // pick a random adjacent cell from list and make it visited
    // sisited cell and kill the wall of adjacent cell and visited cell
    
    // stage 3
    // repeate step 2 untill adjacent cell list become 0

    let neighbour = [];

    this.setup = function () {
        reset();
        neighbour.length = 0;
        createGrid();

        // pick random cell, mark it visited and store its neighbours
        let cell = grid[randomNo(grid.length)];
        cell.visited = true;
        cell.findAdjacent(grid, neighbour);
    }
    this.beggin = function () {
        // clear previous canvas then draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw(ctx, w);

        // stop animation when no neighbour available
        if(neighbour.length === 0) {
            for (let i = 0; i < animation_id.length; i++) {
                clearInterval(animation_id[i]);
            }
            return;
        }

        // pick random neighbour cell mark it visited and remove from neighbour list
        let r = randomNo(neighbour.length);
        let cellId = neighbour[r];
        let current = grid[cellId];
        current.visited = true;
        current.isNeighbour = false;
        neighbour.splice(r, 1);

        // find and store neighbours of current cell
        current.findAdjacent(grid, neighbour);

        // get random visited neighbour cell and kill walls of them
        let visited = current.visitedCells(grid);
        breakWalls(current, visited);
    };
}


function Depth_n_Backtracking() {
    this.current;
    let stack = [];
    
    this.setup = function () {
        reset();
        stack.length = 0;
        createGrid();

        // pick starting cell, push it to stack, mark it visited
        this.current = grid[0];
        stack.push(this.current);
        this.current.visited = true;
    };
    this.solve = function () {
        // clear previous canvas then draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();

        // stop animation when stack is non
        if (stack.length === 0) {
            for (let i = 0; i < animation_id.length; i++) {
                clearInterval(animation_id[i]);
            }
            return;
        }

        // mark current cell for animation
        this.current.mark(ctx);

        // find current cell random neighbour cell
        // kill walls between them and make founded cell to current cell
        // if no neighbour found, then delete last cell from stack and make it current cell
        // repeat steps
        let next = this.current.neighbour(grid);
        if (next) {
            next.visited = true;
            stack.push(next);
            breakWalls(this.current, next);
            this.current = next;
        } else {
            this.current = stack.pop();
        }
    };
}
function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid.length = 0;
}
function createGrid() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let cell = new Cell(row, col);
            grid.push(cell);
        }
    }
}
function index(row, col) {
    if (row < 0 || row > rows -1 || col < 0 || col > cols - 1) {
        return -1;
    } else {
        return row * rows + col;
    }
}

function breakWalls(current, end) {
    let x = current.row - end.row;
    if (x === 1) {              // top wall
        current.wall[0] = false;
        end.wall[2] = false;
    } else if (x === -1) {      // bottom wall
        current.wall[2] = false;
        end.wall[0] = false;
    }

    let y = current.col - end.col;
    if (y === 1) {              // left wall
        current.wall[3] = false;
        end.wall[1] = false;
    } else if (y === -1) {      // right wall
        current.wall[1] = false;
        end.wall[3] = false;
    }
}
function draw() {
    for (let i = 0; i < grid.length; i++) {
        grid[i].draw(ctx, w);
    }
}
function randomNo(length) {
    return Math.floor(Math.random() * length)
}
