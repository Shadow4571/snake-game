/**
 * Класс узла графа.
 * Содержит информацию с координатами узла на карте, типом объекта в этом узле и доступными путями в другие узлы.
 */
class GraphNode {
    constructor(x, y, gameObjectType, pathToNodes) {
        this.x = x;
        this.y = y;
        this.gameObjectType = gameObjectType;
        this.pathToNodes = pathToNodes;
        this.visited = false;
    }

    toString() {
        return "X: " + this.x + " Y: " + this.y + " Type: " + this.gameObjectType + " Visited: " + this.visited;
    }
}