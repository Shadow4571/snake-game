/**
 * Функция возвращает набор пустых координат на карте.
 * @param objectsOnMap - объекты на карте
 * @returns {[]}
 */
function getEmptyCoordinatesOnMap(objectsOnMap) {
    let result = [];
    for(let i = 1; i < MAP_SIZE.WIDTH - 1; i++) {
        for(let j = 1; j < MAP_SIZE.HEIGHT - 1; j++) {
            let check = true;
            for(let object of objectsOnMap) {
                if(object.x === i && object.y === j) {
                    check = false;
                    break;
                }
            }

            if(check) {
                result.push({x: i, y: j});
            }
        }
    }

    return result;
}

/**
 * Вернуть координаты еды из динамических объектов.
 * @param dynamicObjects - динамические объекты с координатами.
 * @returns {undefined|{x: Number, y: Number}}
 */
function getFoodCoordinateFromDynamicObjects(dynamicObjects) {
    for(let object of dynamicObjects) {
        if(object.objectType === GameObjectType.FOOD) {
            return object.coordinates[0];
        }
    }

    return undefined;
}

function countSnakePartNearToFood(dynamicObjects) {
    let foodCoordinate = null;
    let snakeCoordinates = null;
    let count = 0;

    for(let object of dynamicObjects) {
        if(object.objectType === GameObjectType.SNAKE) {
            snakeCoordinates = object.coordinates;
        }

        if(object.objectType === GameObjectType.FOOD) {
            foodCoordinate = object.coordinates[0];
        }
    }

    if(!foodCoordinate || !snakeCoordinates) {
        return count;
    }

    let nearCoordinates = [{x: foodCoordinate.x - 1, y: foodCoordinate.y}, {x: foodCoordinate.x + 1, y: foodCoordinate.y}, {x: foodCoordinate.x, y: foodCoordinate.y - 1}, {x: foodCoordinate.x, y: foodCoordinate.y + 1}];

    for(let snakePart of snakeCoordinates) {
        for(let near of nearCoordinates) {
            if(near.x === snakePart.x && near.y === snakePart.y) {
                count++;
            }
        }
    }

    return count;
}

/**
 * Проверить является ли старый вектор противонаправленным к новому вектору.
 * @param oldVector - старый вектор.
 * @param newVector - новый вектор.
 * @returns {boolean}
 */
function checkOppositeDirectionFromVectors(oldVector, newVector) {
    return (oldVector.x === -1 && newVector.x === 1) || (oldVector.y === -1 && newVector.y === 1) || (oldVector.x === 1 && newVector.x === -1) || (oldVector.y === 1 && newVector.y === -1);
}

/**
 * Вернуть нормализованный и округленный вектор направления между двумя координатами.
 * @param destination - координаты назначения.
 * @param source - координаты источника.
 * @returns {{x: Number, y: Number}|{x: Number, y: Number}}
 */
function getAxisVectorBetweenCoordinates(destination, source) {
    if(destination === null || destination === undefined || source === null || source === undefined) {
        return {x: 0, y: 0};
    }

    let vector = new Vector(destination.x - source.x, destination.y - source.y).normalize();

    return {x: Math.round(vector.x), y: Math.round(vector.y)};
}

/**
 * Создать копию графа через преобразование объекта к JSON.
 * @param graph - исходный граф.
 * @returns {any} - копия графа.
 */
function createGraphCopy(graph) {
    return JSON.parse(JSON.stringify(graph));
}

/**
 * Вернуть расстояние между двумя координатами.
 * @param a - {x: Number, y: Number} координаты первой точки.
 * @param b - {x: Number, y: Number} координаты второй точки.
 * @returns {number}
 */
function getDistanceBetweenCoordinates(a, b) {
    let x = b.x - a.x;
    let y = b.y - a.y;

    return x * x + y * y;
}

/**
 * Вернуть направление из двух координат.
 * @param aX - координата x первой точки.
 * @param aY - координата y первой точки.
 * @param bX - координата x второй точки.
 * @param bY - координата y второй точки.
 * @returns {Direction} - направление.
 */
function getDirection(aX, aY, bX, bY) {
    let x = aX - bX;
    let y = aY - bY;
    let direction = Direction.UP;

    if(x < 0) {
        direction = Direction.LEFT;
    }

    if(x > 0) {
        direction = Direction.RIGHT;
    }

    if(y > 0) {
        direction = Direction.DOWN;
    }

    return direction;
}