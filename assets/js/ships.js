const COLS = 'ABCDEFGHIJ';
const NAMES = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];
let selected = null;
let hover = [];

function coordToCell(x, y) {
    return COLS.charAt(x - 1) + y;
};

function cellToCoord(cell) {
    return [COLS.indexOf(cell.charAt(0)) + 1, +cell.slice(1)];
};

function toCoords(kind, start, orientation) {
    let size = 0;
    let [x, y] = cellToCoord(start);
    let result = [];
    switch (kind) {
        case 'carrier': size = 5; break;
        case 'battleship': size = 4; break;
        case 'cruiser': case 'submarine': size = 3; break;
        case 'destroyer': size = 2; break;
    }
    if (size === 0) {
        console.error("unrecognized ship type: '" + kind + "'");
        throw "unrecognized ship type!";
        return;
    }
    for (let i=0; i < size; i++) {
        result.push(orientation ? coordToCell(x, y+i) : coordToCell(x+i, y));
    }
    return result;
}

function isVertical(cells) {
    let last = null;
    return cells.reduce((val, cell) => {
        if (!last) last = cell.charAt(0);
        return val && last === cell.charAt(0);
    }, true);
}

function collision(cells) {
    for (let i=0; i<cells.length; i++) {
        const pt = cells[i];
        for (let s=0; s<NAMES.length; s++) {
            if (obj[NAMES[s]].indexOf(pt) > -1)
                return {
                    name: NAMES[s],
                    coords: obj[NAMES[s]]
                };
        }
    }
    return null;
    // return false;
}

function place(name, coords) {
    if (NAMES.indexOf(name) > -1) {
        obj[name] = coords;
        return;
    }
    throw "Unrecognized ship name '" + name + "'";
}


function guess(address) {
    if (obj.guesses.indexOf(address) > -1) return 0;
    obj.guesses.push(address);
    return collision([address]) ? 1 : -1;
}

function newOrigin(coords, offset, vertical) {
    let col = COLS.indexOf(coords[0]);
    let row = coords.slice(1);
    if (vertical) row -= offset; else col -= offset;
    return COLS[col] + row;
}

function dragCoords(ship, source, vertical) {
    if (!ship) return [];
    const range = [...Array(ship.coords.length).keys()];
    const col = COLS.indexOf(source[0]);
    const row = +source.slice(1);
    if (vertical) return range.map(i => COLS[col] + (row + i));
    return range.map(i => COLS[col + i] + row);
}

function startMove(ship, source) {
    const vertical = isVertical(ship.coords);
    const offset = ship.coords.indexOf(source);
    selected = {ship, source, offset, vertical};
}

function moveTo(tile) {
    if (!selected) return;
    const origin = newOrigin(tile, selected.offset, selected.vertical);
    hover = dragCoords(selected.ship, origin, selected.ship.vertical);
}

function endMove(destination) {
    console.log('dropped ', destination);
    place(selected.ship.name, hover);
    selected = null;
}

function getShip() {
    return selected;
}

let obj = {
    // constants
    HORIZONTAL: 0,
    VERTICAL: 1,
    // data
    carrier: [],
    battleship: [],
    cruiser: [],
    submarine: [],
    destroyer: [],
    guesses: [],
    // methods
    toCoords,
    collision,
    place,
    guess,
    startMove,
    moveTo,
    endMove,
    getShip
};
export default obj;