/**
 * Менеджер рекордов.
 * Хранит информацию об определенном количестве рекордов, указанном во время инициализации.
 * Сортирует их по убыванию значения score (счет), так же содержит режим (игрок или ИИ) и время жизни игры.
 */
class RecordsManager {
    constructor(maxRecordsCount) {
        this._recordsList = [];
        this._maxCount = maxRecordsCount;
        this.loadRecordsFromCookies();
    }

    /**
     * Открыть все рекорды из куки.
     */
    loadRecordsFromCookies() {
        this._recordsList = [];

        for(let i = 0; i < this._maxCount; i++) {
            let key = "record." + i.toString();

            if(cookieService.hasCookie(key)) {
                let record = cookieService.getParsedCookieByName(key);
                if(record !== null && record.isArray && record.length === 3) {
                    this._recordsList.push({mode: record[0], score: Number.parseInt(record[1]), time: Number.parseFloat(record[2])});
                }
            }
        }
    }

    /**
     * Добавить новый рекорд.
     * @param record - {mode: String, score: Number, time: Number} объект рекорда с записью а режиме игры, счете и времени.
     */
    addRecord(record) {
        if("mode" in record && "score" in record && "time" in record) {
            if(this._recordsList.length < this._maxCount) {
                this._recordsList.push(record);
            } else {
                this._recordsList.splice(this._recordsList.length - 1, 1);
                this._recordsList.push(record);
            }

            this._recordsList.sort(function (a, b) {return b.score - a.score});
        }
    }

    /**
     * Обновить рекорды в куки.
     */
    updateRecords() {
        let counter = 0;

        if(this._recordsList.length === 0) {
            for(let i = 0; i < this._maxCount; i++) {
                let key = "record." + i.toString();
                if(cookieService.hasCookie(key)) {
                    cookieService.deleteCookie(key);
                }
            }
        }

        for(let record of this._recordsList) {
            let value = record.mode + "|" + record.score + "|" + record.time + "|";

            cookieService.addCookieAndUpdate("record." + (counter++).toString(), value);
        }
    }

    /**
     * Очистить все рекорды.
     */
    clearRecords() {
        this._recordsList = [];
        this.updateRecords();
    }

    /**
     * Получить все рекорды.
     * @returns {[]} - список всех доступных рекордов.
     */
    getRecords() {
        let result = [];

        for(let record of this._recordsList) {
            result.push(record);
        }

        return result;
    }

    /**
     * Преобразовать рекорд в строку.
     * @param record - объект рекорда.
     * @returns {string} - строка рекорда.
     */
    static recordToString(record) {
        return "Mode: " + record.mode + "\nScore: " + record.score;
    }
}