/**
 * Виджет внутри игры.
 * Отображает состояние и количество набранных очков.
 */
class GameWidget extends IWidget {
    constructor(reloadFromDefaults, defaults) {
        super(WidgetType.GAME, reloadFromDefaults, defaults);
        this.scoreCount = 0;
        this.survivalTime = 0;
        this.reloadWidget();
    }

    reloadWidget() {
        if(super.reloadWidget() && this.defaults) {
            this.scoreCount = "scoreCount" in this.defaults ? this.defaults.scoreCount : this.scoreCount;
            this.survivalTime = "survivalTime" in this.defaults ? this.defaults.survivalTime : this.survivalTime;
            return true;
        }

        return false;
    }

    processData(processedObjects) {
        if(super.processData(processedObjects)) {
            try {
                this.scoreCount = processedObjects.scoreCount;
                this.survivalTime = processedObjects.survivalTime;
                return true;
            } catch (exp) { console.log(exp) }
        }

        return false;
    }

    getData() {
        return {scoreCount: this.scoreCount, survivalTime: this.survivalTime};
    }

    update() {

    }

    draw() {

    }
}