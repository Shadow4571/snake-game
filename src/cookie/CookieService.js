/**
 * Сервис куки. Предоставляет возможность записи и считывания значений из куки.
 * Во время инициализации считывает все значения из куки в локальную карту ключ-значений. Синхронизация локальной версии с куки происходит во время вызова необходимых методов.
 * Поддерживает работу с 10-ю куки. Во время инициализации указывается время жизни куки.
 * Объект lifeTime должен содержать поля day, month или year, количество дней, месяцов и лет, соответсвенно, в течении которых куки будут доступны.
 */
class CookieService {
    constructor(lifeTime) {
        this._cookieRaw = "";
        this._cookieMap = new Map();
        this._lifeTime = new Date();
        this._maxCookies = 10;
        this.setLifeTime(lifeTime);
        this._updateCookiesLocal();
    }

    /**
     * Обновить куки локально.
     * @private
     */
    _updateCookiesLocal() {
        this._cookieRaw = decodeURIComponent(document.cookie);
        this._cookieMap.clear();

        for(let cookie of this._cookieRaw.split(";")) {
            let pair = cookie.split("=");
            if(pair[0] !== null && pair[0] !== undefined && pair[1] !== null && pair[1] !== undefined) {
                this._cookieMap.set(pair[0], pair[1]);
            }
        }
    }

    /**
     * Установить время жизни куки.
     * @param lifeTime - {day: Number, month: Number, year: Number}
     */
    setLifeTime(lifeTime) {
        let time = 3000;

        if(lifeTime !== null && lifeTime !== undefined) {
            if ("day" in lifeTime) {
                time += 864e5 * lifeTime.day;
            }

            if ("month" in lifeTime) {
                time += 2592e6 * lifeTime.month;
            }

            if ("year" in lifeTime) {
                time += 31536e6 * lifeTime.year;
            }
        }

        this._lifeTime = new Date(Date.now() + time);
    }

    /**
     * Проверить существует ли куки по названию.
     * @param name - название куки.
     * @returns {boolean}
     */
    hasCookie(name) {
        return this._cookieMap.has(name);
    }

    /**
     * Вернуть значение куки по названию. Если такого куки нету, выбросить исключение.
     * @param name - название куки.
     * @returns {String} - значение в куки.
     */
    getCookieByName(name) {
        if(this._cookieMap.has(name)) {
            return this._cookieMap.get(name);
        }

        throw new Error("Cookie with key: " + name + " does not exist.");
    }

    /**
     * Распарсить возвращаемое значение из куки (Значение в куки по одному названию разделяются |)
     * @param name - название куки.
     * @returns {string[]} - массив значений.
     */
    getParsedCookieByName(name) {
        return this.getCookieByName(name).split("|");
    }

    /**
     * Вернуть все пары ключ-значение из куки.
     * @param parseValue - необходимо ли распарсить значение.
     * @returns {[]} - массив всех пар.
     */
    getAllCookiesEntries(parseValue) {
        let result = [];

        for(let cookie of this._cookieMap.entries()) {
            result.push({key: cookie.key, value: parseValue ? cookie.value.parse("|") : cookie.value});
        }

        return result;
    }

    /**
     * Добавить куки локально и обновить глобальные куки.
     * @param key - название куки.
     * @param value - значение.
     * @returns {boolean} - успешно ли добавилось и обновилось куки.
     */
    addCookieAndUpdate(key, value) {
        if(this.addCookie(key, value)) {
            this.updateCookiesFromLocal();
            return true;
        }

        return false;
    }

    /**
     * Добавить куки локально.
     * @param key - название куки.
     * @param value - значение.
     * @returns {boolean} - успешно ли добавилось значение локально.
     */
    addCookie(key, value) {
        if(this._cookieMap.size === this._maxCookies) {
            return false;
        }

        if(this._cookieMap.has(key)) {
            this._cookieMap.delete(key);
        }

        this._cookieMap.set(key, value);
        return true;
    }

    /**
     * Удалить значение куки локально.
     * @param key - название куки.
     * @returns {boolean} - успешно ли удалилось значение.
     */
    deleteCookie(key) {
        if(this._cookieMap.has(key)) {
            this._cookieMap.delete(key);
            return true;
        }

        return false;
    }

    /**
     * Очистить все куки, локальные и глобальные.
     */
    clearAllCookies() {
        for(let cookie of this._cookieMap.entries()) {
            this._cookieMap[cookie.key] = "expires=" + new Date().toUTCString();
        }

        this.updateCookiesFromLocal();
        this._cookieMap.clear();
    }

    /**
     * Обновить все глобальные куки из локальных.
     */
    updateCookiesFromLocal() {
        for(let cookie of this._cookieMap.entries()) {
            document.cookie = CookieService.transformCookieToValidString(cookie[0], cookie[1], this._lifeTime);
        }

        this._updateCookiesLocal();
    }

    /**
     * Преобразовать ключ, значение и время жизни куки к правильной строке, которая должна храниться в глобальных куки.
     * @param key - название куки.
     * @param value - значение.
     * @param lifeTime - время жизни.
     * @returns {string} - корректная строка для записи в глобальные куки.
     */
    static transformCookieToValidString(key, value, lifeTime) {
        return encodeURIComponent(key + "=" + value + ";expires=" + lifeTime.toUTCString());
    }
}