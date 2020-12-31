const cols = 'ABCDEFGHIJ';

function coordToCell(x, y) {
    return cols.charAt(x - 1) + y;
};

function cellToCoord(cell) {
    return [cols.indexOf(cell.charAt(0)) + 1, +cell.slice(1)];
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
        alert("unrecognizes ship type: '" + kind + "'");
        throw "unrecognizes ship type!";
        return;
    }
    for (let i=0; i < size; i++) {
        result.push(orientation ? coordToCell(x, y+i) : coordToCell(x+i, y));
    }
    return result;
}

function collision(cells) {
    for (let i=0; i<cells.length; i++) {
        const pt = cells[i];
        if (obj.carrier.indexOf(pt) > -1) return true;
        if (obj.battleship.indexOf(pt) > -1) return true;
        if (obj.cruiser.indexOf(pt) > -1) return true;
        if (obj.submarine.indexOf(pt) > -1) return true;
        if (obj.destroyer.indexOf(pt) > -1) return true;
    }
    return false;
}

function place(name, coords) {
    switch (name) {
        case 'carrier':
        case 'battleship':
        case 'cruiser': 
        case 'submarine':
        case 'destroyer':
            obj[name] = coords;
            return;
    }
    throw "Unrecognized ship name '" + name + "'";
}

function guess(address) {
    if (obj.guesses.indexOf(address) > -1) {
        return 0;
    }
    obj.guesses.push(address);

    return collision([address]) ? 1 : -1;

    // // random hit or miss
    // return Math.round(Math.random()) ? 1 : -1;
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
    guess
};
export default obj;