const Trigger = { LEFT: "Left", UP: "Up", RIGHT: "Right", DOWN: "Down", PAUSE: "Pause", LMB: "LMB", CMB: "CMB", RMB: "RMB"};
const Direction = { LEFT: "Left", LEFT_UP: "Left up", UP: "Up", RIGHT_UP: "Right up", RIGHT: "Right", RIGHT_DOWN: "Right down", DOWN: "Down", LEFT_DOWN: "Left down" };

/**
 * Класс набора триггеров управления.
 * Триггер привязан к коду клавиши при нажатии на которую изменяется состояние триггера.
 * Например, триггер Trigger.UP по умолчанию связан с клавишей 87 (W) и изменяет своё состояние в зависимости от состояния данной клавиши.
 */
class TriggerSet {
    constructor() {
        this._triggers = new Map();
        this.setDefaults();

        let savedTriggers = loadTriggerSetFromCookies();
        for(let trigger of savedTriggers.entries()) {
            this.setTriggerKey(trigger[0], trigger[1]);
        }

        this._triggersStates = new Map();
        this._triggersStates.set(Trigger.LEFT, false);
        this._triggersStates.set(Trigger.UP, false);
        this._triggersStates.set(Trigger.RIGHT, false);
        this._triggersStates.set(Trigger.DOWN, false);
        this._triggersStates.set(Trigger.PAUSE, false);
        this._triggersStates.set(Trigger.LMB, false);
        this._triggersStates.set(Trigger.CMB, false);
        this._triggersStates.set(Trigger.RMB, false);

        this._lastPressedKey = {key: null, keyCode: null};
        this._currentPressedKey = {key: null, keyCode: null};
        console.log("LOAD CLASS: " + this.constructor.name);
    }

    /**
     * Установить триггеры в состояние по умолчанию.
     * LEFT - 65 (A), UP - 85 (W), RIGHT - 68 (D), DOWN - 83 (S), PAUSE - 27 (Esc)
     */
    setDefaults() {
        this._triggers.clear();

        this._triggers.set(65, Trigger.LEFT);
        this._triggers.set(87, Trigger.UP);
        this._triggers.set(68, Trigger.RIGHT);
        this._triggers.set(83, Trigger.DOWN);
        this._triggers.set(27, Trigger.PAUSE);
    }

    /**
     * Установить клавишу для триггера.
     * @param key - клавиша.
     * @param trigger - триггер.
     */
    setTriggerKey(key, trigger) {
        for(let current of this._triggers.entries()) {
            if(current[1] === trigger) {
                this._triggers.delete(current[0]);
                break;
            }
        }

        this._triggers.set(key, trigger);
    }

    /**
     * Функция обрабатывает нажатие на клавишу.
     * Так же устанавливаются переменные текущей нажатой клавиши и последней нажатой клавиши.
     * @param pressedKey - код нажатой клавиши.
     * @param key - символ нажатой клавиши.
     */
    pressKey(pressedKey, key) {
        if(this._triggers.has(pressedKey)) {
            this._triggersStates[this._triggers.get(pressedKey)] = true;
        }

        this._lastPressedKey.key = key;
        this._lastPressedKey.keyCode = pressedKey;
        this._currentPressedKey.key = key;
        this._currentPressedKey.keyCode = pressedKey;
    }

    /**
     * Функция срабатывает когда нажатую клавишу отпускают.
     * @param releasedKey - код отпущенной клавиши.
     * @param key - символ отпущенной клавиши.
     */
    releaseKey(releasedKey, key) {
        if(this._triggers.has(releasedKey)) {
            this._triggersStates[this._triggers.get(releasedKey)] = false;
        }

        this._currentPressedKey.key = null;
        this._currentPressedKey.keyCode = null;
    }

    /**
     * Функция срабатывает во время нажатия клавиши мыши.
     * @param event - событие нажатия.
     */
    pressMouseKey(event) {
        if(event.button === 0) {
            this._triggersStates[Trigger.LMB] = true;
        }

        if(event.button === 1) {
            this._triggersStates[Trigger.CMB] = true;
        }

        if(event.button === 2) {
            this._triggersStates[Trigger.RMB] = true;
        }
    }

    /**
     * Функция срабатывает во время отпускания клавиши мыши.
     * @param event - событие отпускания.
     */
    releaseMouseKey(event) {
        if(event.button === 0) {
            this._triggersStates[Trigger.LMB] = false;
        }

        if(event.button === 1) {
            this._triggersStates[Trigger.CMB] = false;
        }

        if(event.button === 2) {
            this._triggersStates[Trigger.RMB] = false;
        }
    }

    /**
     * Вернуть направление из нажатых клавиш.
     * @returns {Direction} - направление нажатия.
     * @deprecated
     */
    getDirection() {
        let direction = undefined;

        if(this.LEFT) {
            direction = Direction.LEFT;
            if(this.UP)
                direction = Direction.LEFT_UP;
            if(this.DOWN)
                direction = Direction.LEFT_DOWN;
        }

        if(this.RIGHT) {
            direction = Direction.RIGHT;
            if(this.UP)
                direction = Direction.RIGHT_UP;
            if(this.DOWN)
                direction = Direction.RIGHT_DOWN;
        }

        if(this.UP)
            direction = Direction.UP;

        if(this.DOWN)
            direction = Direction.DOWN;

        return direction;
    }

    /**
     * Вернуть вектор направления из нажатых клавиш.
     * @returns {Vector} - единичный вектор направления.
     */
    getAxisVector() {
        let vector = new Vector();

        if(this.LEFT)
            vector.x = -1;

        if(this.RIGHT)
            vector.x = 1;

        if(this.UP)
            vector.y = -1;

        if(this.DOWN)
            vector.y = 1;

        return vector;
    }

    /**
     * Вернуть набор всех триггеров.
     * @returns {Map<Number>, <Trigger>}
     */
    getTriggersSet() {
        let result = new Map();

        for(let trigger of this._triggers.entries()) {
            result.set(trigger[0], trigger[1]);
        }

        return result;
    }

    /**
     * Вернуть код клавиши связанной с триггером.
     * @param inputTrigger - триггер.
     * @returns {null|Number}
     */
    getKeyCodeFromTrigger(inputTrigger) {
        for(let trigger of this._triggers.entries()) {
            if(trigger[1] === inputTrigger) {
                return trigger[0];
            }
        }

        return null;
    }

    // Вернуть состояние тригера "Влево"
    get LEFT() {
        return this._triggersStates[Trigger.LEFT];
    }

    // Вернуть состояние тригера "Вверх"
    get UP() {
        return this._triggersStates[Trigger.UP];
    }

    // Вернуть состояние тригера "Вправо"
    get RIGHT() {
        return this._triggersStates[Trigger.RIGHT];
    }

    // Вернуть состояние тригера "Вниз"
    get DOWN() {
        return this._triggersStates[Trigger.DOWN];
    }

    // Вернуть состояние тригера "Пауза"
    get PAUSE() {
        return this._triggersStates[Trigger.PAUSE];
    }

    // Вернуть состояние тригера "Левая кнопка мыши"
    get LMB() {
        return this._triggersStates[Trigger.LMB];
    }

    // Вернуть состояние тригера "Центральная кнопка мыши"
    get CMB() {
        return this._triggersStates[Trigger.CMB];
    }

    // Вернуть состояние тригера "Правая кнопка мыши"
    get RMB() {
        return this._triggersStates[Trigger.RMB];
    }

    // Вернуть последнюю нажатую клавишу
    get LastPressedKey() {
        return {key: this._lastPressedKey.key, keyCode: this._lastPressedKey.keyCode};
    }

    // Вернуть текущую нажатую клавишу
    get CurrentPressedKey() {
        return {key: this._currentPressedKey.key, keyCode: this._currentPressedKey.keyCode};
    }

    /**
     * Спарсить входное значение триггера к перечисоению.
     * @param trigger {String} - значение триггера.
     * @returns {Trigger} - триггер из перечисления.
     */
    static parseTrigger(trigger) {
        if(trigger === null || trigger === undefined) {
            throw new Error("Cannot parse trigger from null or undefined object.");
        }

        if(trigger === Trigger.LEFT.toString()) {
            return Trigger.LEFT;
        }

        if(trigger === Trigger.UP.toString()) {
            return Trigger.UP;
        }

        if(trigger === Trigger.RIGHT.toString()) {
            return Trigger.RIGHT;
        }

        if(trigger === Trigger.DOWN.toString()) {
            return Trigger.DOWN;
        }

        if(trigger === Trigger.PAUSE.toString()) {
            return Trigger.PAUSE;
        }

        throw new Error("Cannot parse trigger from input object: " + trigger.toString());
    }
}