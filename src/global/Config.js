// Размер полотна
const CANVAS_SIZE = {X: 800, Y: 800};
// Размер тайла (блока на карте)
const TILE_SIZE = {WIDTH: 20, HEIGHT: 20};
// Размер карты вычисляется из размера всего холста и размера блока
const MAP_SIZE = {WIDTH: CANVAS_SIZE.X / TILE_SIZE.WIDTH, HEIGHT: CANVAS_SIZE.Y / TILE_SIZE.HEIGHT};
// Глобальный уровень громкости
let SOUND_VOLUME = 0;

/**
 * Функция проверяет все загруженные ресурсы.
 * @returns {{result: boolean, errors: []}}
 */
function checkLoadedResources() {
    let fontsEvent = {result: true, errors: []};

    if(FontPixelGeorgia === undefined || FontPixelGeorgia === null) {
        fontsEvent.result = false;
        fontsEvent.errors.push("Font Pixel Georgia was not loaded.");
    }

    return fontsEvent;
}

/**
 * Загрузить набор триггеров управления из куки.
 * @returns {Map<any, any>}
 */
function loadTriggerSetFromCookies() {
    let result = new Map();

    if(!cookieService.hasCookie("controls")) {
        return result;
    }

    let controls = cookieService.getParsedCookieByName("controls");
    for(let control of controls) {
        let pair = control.split(":");

        try {
            if(pair !== null && pair !== undefined && pair.length === 2) {
                let key = Number.parseInt(pair[0]);
                let trigger = TriggerSet.parseTrigger(pair[1]);

                result.set(key, trigger);
            }
        } catch (exp) {
            console.log(exp);
        }
    }

    return result;
}

/**
 * Сохранить набор триггеров управления в куки.
 * @param triggerSet - набор триггеров.
 * @returns {boolean}
 */
function saveTriggerSetToCookies(triggerSet) {
    let value = "";

    for(let trigger of triggerSet.entries()) {
        value += trigger[0] + ":" + trigger[1] + "|";
    }

    return cookieService.addCookieAndUpdate("controls", value);
}

/**
 * Вернуть символ по коду клавиши.
 * @param keyCode - код клавиши.
 * @returns {string}
 */
function getKeyCharFromKeyCode(keyCode) {
    if(keyCode === null || keyCode === undefined) {
        return "?";
    }

    if(keyCode === 37) {
        return "←";
    }

    if(keyCode === 38) {
        return "↑";
    }

    if(keyCode === 39) {
        return "→";
    }

    if(keyCode === 40) {
        return "↓";
    }

    return String.fromCharCode(keyCode);
}

/**
 * Загрузить глобальное значение уровня звука из куки.
 * @returns {number}
 */
function loadSoundConfigFromCookies() {
    if(!cookieService.hasCookie("sound")) {
        return 0.5;
    }

    let volume = 0.5;
    let value = cookieService.getCookieByName("sound");

    try {
        volume = Number.parseFloat(value);
    } catch (exp) {
        console.log(exp);
    }

    return volume;
}

/**
 * Сохранить глобальное значение уровня звука в куки.
 * @param soundVolume
 */
function saveSoundConfigToCookies(soundVolume) {
    if(soundVolume < 0 || soundVolume > 1) {
        return;
    }

    cookieService.addCookieAndUpdate("sound", soundVolume);
}