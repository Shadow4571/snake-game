/**
 * Класс карты-графа.
 * Данный класс необходим для того, чтобы ИИ мог найти путь в графе до определенной точки или объекта.
 */
class GraphMap {
    /**
     * @param staticObjects - статические объекты на карте ( например стены ), которые змейка должна избегать.
     * Если в определенной точке стоит объект, то убираем путь к нему.
     */
    constructor(staticObjects) {
        this.width = MAP_SIZE.WIDTH;
        this.height = MAP_SIZE.HEIGHT;
        this.graph = [];
        this.dynamicGraph = [];
        this._backgroundTexture = textureManager.getTexture(Map_Static);

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                let check = false;

                if (check) {

                } else {
                    let pathToNodes = [];
                    if (i > 0 && !this._checkPathToWall(i - 1, j, staticObjects)) {
                        pathToNodes.push((i - 1) * this.width + j);
                    }

                    if (i < this.width - 1 && !this._checkPathToWall(i + 1, j, staticObjects)) {
                        pathToNodes.push((i + 1) * this.width + j);
                    }

                    if (j > 0 && !this._checkPathToWall(i, j - 1, staticObjects)) {
                        pathToNodes.push(i * this.width + j - 1);
                    }

                    if (j < this.height - 1 && !this._checkPathToWall(i, j + 1, staticObjects)) {
                        pathToNodes.push(i * this.width + j + 1);
                    }

                    this.graph.push(new GraphNode(i, j, GameObjectType.NONE, pathToNodes))
                }
            }
        }

        console.log("LOAD CLASS: " + this.constructor.name);
    }

    /**
     * Метод создает задний фон для карты, используя набор текстур.
     * @deprecated
     * @private
     */
    _createRandomBackground() {
        this._backgroundTexture = createImage(MAP_SIZE.WIDTH * TILE_SIZE.WIDTH, MAP_SIZE.HEIGHT * TILE_SIZE.HEIGHT);
        this._backgroundTexture.loadPixels();

        for(let x = 0; x < this.width; x++) {
            for(let y = 0; y < this.height; y++) {
                let choice = Math.round(Math.random() * 4);
                let texture = choice === 1 ? textureManager.getTexture(Map_Ground_Sand_03) : choice === 2 ? textureManager.getTexture(Map_Ground_Sand_02) : textureManager.getTexture(Map_Ground_Sand_01);

                for(let i = 0; i < TILE_SIZE.WIDTH; i++) {
                    for(let j = 0; j < TILE_SIZE.HEIGHT; j++) {
                        this._backgroundTexture.set(x * TILE_SIZE.WIDTH + i, y * TILE_SIZE.HEIGHT + j, texture.get(i, j));
                    }
                }
            }
        }

        this._backgroundTexture.updatePixels();
    }

    /**
     * Проверить находится ли в данной координате статический объект.
     * @param x - координата x.
     * @param y - координата y.
     * @param staticObjects - статические объекты.
     * @returns {boolean}
     * @private
     */
    _checkPathToWall(x, y, staticObjects) {
        for (let i = 0; i < staticObjects.length; i++) {
            if (staticObjects[i].mapX === x && staticObjects[i].mapY === y) {
                return true;
            }
        }

        return false;
    }

    /**
     * Рекурсивный поиск в глубину. Находит длинный путь до первого типа объекта, указанного в findObjectTypes.
     * @param graph - граф со всеми объектами на карте.
     * @param graphNode - узел графа.
     * @param visitedNodes - массив посещенных узлов.
     * @param findObjectTypes - массив типов объектов, которые можно искать.
     * @param resultPath - результирующий путь.
     * @param isIgnoreEdge - необходимо ли игнорировать крайние ребра графа во время поиска.
     * @returns {Array|null} - возвращает массив узлов пути. Если найти путь не удалось, возвращает null.
     * @private
     */
    _dfs(graph, graphNode, visitedNodes, findObjectTypes, resultPath, isIgnoreEdge) {
        visitedNodes.push(graphNode);

        if (findObjectTypes.includes(graphNode.gameObjectType)) {
            if (resultPath === null) {
                resultPath = [];
            }

            resultPath.push(graphNode);
            return resultPath;
        }

        for (let neighbor of graphNode.pathToNodes) {
            let node = graph[neighbor];
            if (!visitedNodes.includes(node) && (node.gameObjectType === GameObjectType.NONE || findObjectTypes.includes(node.gameObjectType)) && ((isIgnoreEdge && !findObjectTypes.includes(node.gameObjectType) && node.x !== 0 && node.y !== 0 && node.x !== MAP_SIZE.WIDTH - 1 && node.y !== MAP_SIZE.HEIGHT) || (isIgnoreEdge && findObjectTypes.includes(node.gameObjectType)) || !isIgnoreEdge)) {
                resultPath = this._dfs(graph, graph[neighbor], visitedNodes, findObjectTypes, resultPath, isIgnoreEdge);

                if (resultPath !== null) {
                    resultPath.push(graphNode);
                    return resultPath;
                }
            }
        }

        return null;
    }

    /**
     * Рекурсивный поиск в ширину. Находит кратчайший путь до первого типа объекта, указанного в findObjectTypes.
     * @param graph - граф со всеми объектами на карте.
     * @param graphNode - узел графа.
     * @param visitedNodes - массив посещенных узлов.
     * @param findObjectTypes - массив типов объектов, которые можно искать.
     * @returns {Array} - возвращает путь до точки.
     * @private
     */
    _bfs(graph, graphNode, visitedNodes, findObjectTypes) {
        let queue = [];
        let parents = new Map();
        parents.set(graphNode, null);
        queue.push(graphNode);
        visitedNodes.push(graphNode);

        let v;
        let find = false;
        while (queue.length > 0 && !find) {
            v = queue.shift();

            for (let neighbor of v.pathToNodes) {
                if (!visitedNodes.includes(graph[neighbor]) && (graph[neighbor].gameObjectType === GameObjectType.NONE || findObjectTypes.includes(graph[neighbor].gameObjectType))) {
                    visitedNodes.push(graph[neighbor]);
                    parents.set(graph[neighbor], v);

                    if (findObjectTypes.includes(graph[neighbor].gameObjectType)) {
                        v = graph[neighbor];
                        find = true;
                        break;
                    }

                    queue.push(graph[neighbor]);
                }
            }
        }

        let result = [];
        result.push(v);
        while (parents.get(v) != null) {
            result.push(parents.get(v));
            v = parents.get(v);
        }

        return find ? result : null;
    }

    /**
     * Вернуть граф с динамическими объектами.
     * @param dynamicObjectWithCoordinates - координаты всех динамических объектов (еда, змейка и т.д)
     * @returns {[]|Array}
     */
    getGraphWithDynamicObjects(dynamicObjectWithCoordinates) {
        this.dynamicGraph = createGraphCopy(this.graph);
        let count = 0;

        while (!this.dynamicGraph) {
            count++;
            console.log("WAIT GRAPH " + count);
        }

        for (let i = 0; i < dynamicObjectWithCoordinates.length; i++) {
            let objectType = dynamicObjectWithCoordinates[i].objectType;
            let objectCoordinates = dynamicObjectWithCoordinates[i].coordinates;

            for (let j = 0; j < objectCoordinates.length; j++) {
                this.dynamicGraph[objectCoordinates[j].x * this.width + objectCoordinates[j].y].gameObjectType = objectType;
            }
        }

        return this.dynamicGraph;
    }

    /**
     * Вернуть кратчайший путь до первого объекта из findObjectTypes.
     * @param startX - координата начала поиска x.
     * @param startY - координата начала поиска y.
     * @param findObjectTypes - массив типов объектов, которые можно искать.
     * @param dynamicGraph - динамический граф.
     * @returns {Array}
     */
    getPathFromDynamicGraphToFirstObjectTypeBFS(startX, startY, findObjectTypes, dynamicGraph) {
        return this._bfs(dynamicGraph, dynamicGraph[startX * this.width + startY], [], findObjectTypes);
    }

    /**
     * Вернуть длинный путь до первого объекта из findObjectTypes.
     * @param startX - координата начала поиска x.
     * @param startY - координата начала поиска y.
     * @param findObjectTypes - массив типов объектов, которые можно искать.
     * @param dynamicGraph - динамический граф.
     * @param isIgnoreEdge - необходимо ли игнорировать крайние ребра графа.
     * @returns {Array}
     */
    getPathFromDynamicGraphToFirstObjectTypeDFS(startX, startY, findObjectTypes, dynamicGraph, isIgnoreEdge) {
        return this._dfs(dynamicGraph, dynamicGraph[startX * this.width + startY], [], findObjectTypes, [], isIgnoreEdge);
    }

    draw() {
        image(this._backgroundTexture, 0, 0);
    }
}