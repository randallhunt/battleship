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

function collision(coords) {
    for (let i=0; i<coords.length; i++) {
        const pt = coords[i];
        if (carrier.indexOf(pt)) return true;
        if (battleship.indexOf(pt)) return true;
        if (cruiser.indexOf(pt)) return true;
        if (submarine.indexOf(pt)) return true;
        if (destroyer.indexOf(pt)) return true;
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
            console.log('ships', obj);
            return;
    }
    throw "Unrecognized ship name '" + name + "'";
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
    // methods
    toCoords,
    collision,
    place
};
export default obj;