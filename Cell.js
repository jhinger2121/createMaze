function Cell(row, col) {
    this.row = row;
    this.col = col;
    this.visited = false;
    this.wall = [true, true, true, true];
    this.active_wall = [false, false, false, false];
    this.isNeighbour = false;

    this.neighbour = function (grid) {

        let top = grid[index(this.row - 1, this.col)],
            right = grid[index(this.row, this.col + 1)],
            bottom = grid[index(this.row + 1, this.col)],
            left = grid[index(this.row, this.col - 1)];
        
        let neighbours = [];
        
        if (top && !top.visited) {
            neighbours.push(top);
        }
        if (right && !right.visited) {
            neighbours.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbours.push(bottom);
        }
        if (left && !left.visited) {
            neighbours.push(left);
        }
        
        if (neighbours.length > 0) {
            let random = Math.floor(Math.random() * neighbours.length);
            return neighbours[random];
        } else {
            return false;
        }
    };

    this.draw = function (ctx, w) {
        let j = this.row * w;
        let i = this.col * w;

        ctx.beginPath()
        // top line
        if (this.wall[0]) {
            ctx.moveTo(i, j)  // 120, 120
            ctx.lineTo(i + w, j) // 120 + 40, 120
            ctx.stroke();
        }

        // right line
        if (this.wall[1]){
            ctx.moveTo(i + w, j) // 160, 120
            ctx.lineTo(i + w, j + w) // 160 + 40, 120 + 40
            ctx.stroke();
        }

        // bottom line
        if (this.wall[2]){
            ctx.moveTo(i + w, j + w)
            ctx.lineTo(i, j + w)
            ctx.stroke();
        }

        // left line
        if (this.wall[3]){
            ctx.moveTo(i, j + w)
            ctx.lineTo(i, j)
            ctx.stroke();
        }
        ctx.closePath();
        
        if (this.isNeighbour) {
            let x = this.col * w;
            let y = this.row * w;
    
            ctx.fillStyle = 'rgb(0, 0, 60)';
            ctx.fillRect(x, y, w, w);
        }
    };
    this.mark = function (ctx) {
        let x = this.col * w;
        let y = this.row * w;

        ctx.fillStyle = 'rgb(110, 155, 0)';
        ctx.fillRect(x, y, w, w);
    };
    this.findAdjacent = function (grid, neighbour) {
        let top = grid[index(this.row - 1, this.col)],
        right = grid[index(this.row, this.col + 1)],
        bottom = grid[index(this.row + 1, this.col)],
        left = grid[index(this.row, this.col - 1)];
        
        if (top && !top.visited) {
            let id = index(this.row - 1, this.col)
            if (!neighbour.includes(id)) {
                top.isNeighbour = true;
                neighbour.push(id);
            }
        }
        if (right && !right.visited) {
            let id = index(this.row, this.col + 1);
            if (!neighbour.includes(id)) {
                right.isNeighbour = true;
                neighbour.push(id);
            }
        }
        if (bottom && !bottom.visited) {
            let id = index(this.row + 1, this.col);
            if (!neighbour.includes(id)) {
                bottom.isNeighbour = true;
                neighbour.push(id);
            }
        }
        if (left && !left.visited) {
            let id = index(this.row, this.col - 1);
            if (!neighbour.includes(id)) {
                left.isNeighbour = true;
                neighbour.push(id);
            }
        }
    };
    this.visitedCells = function (grid) {

        let top = grid[index(this.row - 1, this.col)],
            right = grid[index(this.row, this.col + 1)],
            bottom = grid[index(this.row + 1, this.col)],
            left = grid[index(this.row, this.col - 1)];
        
        let neighbours = [];
        
        if (top && top.visited) {
            neighbours.push(top);
        }
        if (right && right.visited) {
            neighbours.push(right);
        }
        if (bottom && bottom.visited) {
            neighbours.push(bottom);
        }
        if (left && left.visited) {
            neighbours.push(left);
        }
        
        if (neighbours.length > 0) {
            let random = Math.floor(Math.random() * neighbours.length);
            return neighbours[random];
        } else {
            return false;
        }
    };
}
