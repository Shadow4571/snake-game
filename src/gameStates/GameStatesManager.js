/**
 * Менеджер игровых состояний.
 * Переключает глобальные игровые состояния, например меню, игра.
 */
class GameStatesManager {
    /**
     * @param gameStatesList - список игровых состояний.
     * @param currentStateInfo - текущее игровое состояние.
     */
    constructor(gameStatesList, currentStateInfo) {
        this.gameStatesMap = new Map();
        this.currentStateInfo = currentStateInfo;

        for(let i = 0; i < gameStatesList.length; i++) {
            if(!this.gameStatesMap.has(gameStatesList[i].stateInfo.info) && gameStatesList[i] instanceof IGameState) {
                this.gameStatesMap.set(gameStatesList[i].stateInfo.info, gameStatesList[i]);
            }
        }

        this.selectState(currentStateInfo);
        console.log("LOAD CLASS: " + this.constructor.name);
    }

    /**
     * Выбрать игровое состояние из менеджера.
     * @param info - игровое состояние.
     */
    selectState(info) {
        this.selectStateWithParameter(info, null);
    }

    /**
     * Выбрать игровое состояние, передав в него объект.
     * @param info - игровое состояние.
     * @param parameter - передаваемый объект.
     */
    selectStateWithParameter(info, parameter) {
        if(this.gameStatesMap.has(info)) {
            if(this.gameStatesMap.get(info).stateInfo.isRecreated || !this.gameStatesMap.get(info).isInitialize) {
                this.gameStatesMap.get(info).init(parameter);
            }

            this.currentStateInfo = info;
        }
    }

    update() {
        this.gameStatesMap.get(this.currentStateInfo).update();
    }

    draw() {
        this.gameStatesMap.get(this.currentStateInfo).draw();
    }
}