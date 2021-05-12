/**
 * "Интерфейс" игрового состояния.
 * Содержит базовые методы для каждого игрового состояния: инициализация, обновление и отрисовка.
 */
class IGameState {
    constructor(stateInfo) {
        this.stateInfo = stateInfo.__proto__ === StateInfo.prototype ? stateInfo : undefined;
        this.isInitialize = false;
    }

    init(initObject) {
        this.isInitialize = true;
    }

    update() {

    }

    draw() {

    }
}