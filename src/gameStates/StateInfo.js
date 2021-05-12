const Info = {MENU: 'Menu', GAME: 'Game'};

/**
 * Класс информации игрового состояния.
 * Содержит информацию о типе игрового состояния (игра или меню) и необходимо ли инициализировать состояние заново.
 */
class StateInfo {
    constructor(info, isRecreated) {
        this.info = info;
        this.isRecreated = isRecreated;
    }
}