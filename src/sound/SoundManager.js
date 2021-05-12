// Перечисление всей музыки в игре
const Musics = {MENU: "Menu", GAME: "Game"};
// Перечисление всех звуков в игре
const Sounds = {EAT_SIMPLE: "Eat simple", BUTTON_HOVERED: "Button hovered", BUTTON_PRESSED: "Button pressed", BUTTON_RELEASED: "Button released", END_GAME_WON: "End game won", END_GAME_LOSE: "End game lose"};

/**
 * Класс менеджера звуков. Содержит все доступные в игре звуки.
 * Позволяет запускать, останавливать и изенять уровень громкости звуков.
 */
class SoundManager {
    constructor() {
        // Загружает карту звуков, которая будет содержать звук по ключу
        this._soundMap = new Map();
        this._soundMap.set(Musics.MENU, loadSound("./res/sound/music-menu.ogg"));
        this.setSoundOptions(Musics.MENU, 0.3, true);
        this._soundMap.set(Musics.GAME, loadSound("./res/sound/music-game.ogg"));
        this.setSoundOptions(Musics.GAME, 0.3, true);
        this._soundMap.set(Sounds.BUTTON_HOVERED, loadSound("./res/sound/sound-button-hovered.wav"));
        this._soundMap.set(Sounds.BUTTON_PRESSED, loadSound("./res/sound/sound-button-pressed.wav"));
        this._soundMap.set(Sounds.BUTTON_RELEASED, loadSound("./res/sound/sound-button-released.wav"));
        this._soundMap.set(Sounds.EAT_SIMPLE, loadSound("./res/sound/sound-eat-food-simple.wav"));
        this._soundMap.set(Sounds.END_GAME_WON, loadSound("./res/sound/sound-end-game-won.wav"));
        this._soundMap.set(Sounds.END_GAME_LOSE, loadSound("./res/sound/sound-end-game-lose.wav"));

        this._callableElement = null;
    }

    /**
     * Установить определенные опции для конкретного звука.
     * @param soundType - тип звука из перечисления.
     * @param volume - уровень громкости звука (от 0 до 1).
     * @param isLoop - нужно ли зациклить звук.
     * @returns {SoundManager}
     */
    setSoundOptions(soundType, volume, isLoop) {
        if(this._soundMap.has(soundType)) {
            this._soundMap.get(soundType).setVolume(volume);
            this._soundMap.get(soundType).setLoop(isLoop);
        }

        return this;
    }

    /**
     * Сбросить елемент, который вызывает звук.
     */
    resetCallableElement() {
        this._callableElement = null;
        return this;
    }

    /**
     * Сбросить элемент, который вызывает звук, только если вызывает функцию этот же элемент.
     * @param callableElement - элемент, вызывающий функцию.
     */
    resetCallableElementFromCurrent(callableElement) {
        if(this._callableElement === callableElement) {
            this.resetCallableElement();
        }

        return this;
    }

    /**
     * Проиграть звук один раз для определенного элемента.
     * @param soundType - тип звука из перечисления.
     * @param callableElement - элемент, вызывающий звук.
     * @returns {SoundManager}
     */
    playSoundOnce(soundType, callableElement) {
        if(this._callableElement !== callableElement) {
            this.playSound(soundType);
            this._callableElement = callableElement;
        }

        return this;
    }

    /**
     * Проиграть звук.
     * @param soundType - тип звука из перечисления.
     * @returns {SoundManager}
     */
    playSound(soundType) {
        if(this._soundMap.has(soundType)) {
            this._soundMap.get(soundType).play();
        }

        return this;
    }

    /**
     * Остановить проигрывание звука.
     * @param soundType - тип звука из перечисления.
     * @returns {SoundManager}
     */
    stopSound(soundType) {
        if(this._soundMap.has(soundType)) {
            this._soundMap.get(soundType).stop();
        }

        return this;
    }

    /**
     * Остановить проигрывание всех звуков.
     * @returns {SoundManager}
     */
    stopAllSound() {
        for(let sound of this._soundMap.values()) {
            sound.stop();
        }

        return this;
    }

    /**
     * Установить уровень мастер громкости (громкость всех звуков).
     * @param volume - уровень громкости (от 0 до 1)
     * @returns {SoundManager}
     */
    setMasterVolume(volume) {
        masterVolume(volume);
        return this;
    }
}