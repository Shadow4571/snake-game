p5.disableFriendlyErrors = true;    // Отключить дружелюбные ошибки библиотеки p5js
let gameStatesManager;              // Менеджер игровых состояний
let textureManager;                 // Менеджер текстур
let recordsManager;                 // Менеджер рекордов
let widgetManager;                  // Менеджер виджетов
let cookieService;                  // Сервис работы с куки
let soundManager;                   // Менеджер звуков
let triggerSet;                     // Набор триггеров управления
let errorBox;                       // Панель критической ошибки

/**
 * Функция пред загрузки.
 * Выполняет первоначальную загрузку ресурсов игры (текстуры, шрифты, звуки).
 */
function preload() {
    // Использовать аудио с форматами ogg и wav
    soundFormats("ogg", "wav");
    FontPixelGeorgia = loadFont(FontPixelGeorgiaPath);
    textureManager = new TextureManager();
    soundManager = new SoundManager();
}

/**
 * Функция инициализации игровых менеджеров и сервисов.
 */
function setup() {
    // Создать холст изображения с режимом WEBGL и определенным размером
    createCanvas(CANVAS_SIZE.X, CANVAS_SIZE.Y, WEBGL);
    // Установить FPS на определенное значение
    frameRate(30);

    cookieService = new CookieService({day: 7});
    recordsManager = new RecordsManager(4);

    SOUND_VOLUME = loadSoundConfigFromCookies();
    soundManager.setMasterVolume(SOUND_VOLUME);
    triggerSet = new TriggerSet();
    widgetManager = new WidgetsManager(WidgetType.NONE);
    gameStatesManager = new GameStatesManager([new MenuState(new StateInfo(Info.MENU, true)), new GameState(new StateInfo(Info.GAME, true))], Info.MENU);

    let loadResult = checkLoadedResources();

    if(!loadResult.result) {
        errorBox = new MessageBox(100, 100, 600,600, "#ffffff", "#e23952", "Some resources was not loaded.", 24, 50, "#282828", LEFT, 10, 18, loadResult.errors, null);
    }

}

/**
 * Функция вызывается при нажатии любой клавиши на клавиатуре.
 */
function keyPressed() {
    triggerSet.pressKey(keyCode, key);
}

/**
 * Функция вызывается при отпускании любой клавиши на клавиатуре.
 */
function keyReleased() {
    triggerSet.releaseKey(keyCode, key);
}

/**
 * Функция вызывается при нажатии кнопок мыши.
 * @param event - событие нажатия, содержит информацию о нажатой кнопке и данных мыши.
 */
function mousePressed(event) {
    triggerSet.pressMouseKey(event);
}

/**
 * Функция вызывается при отпускании кнопок мыши.
 * @param event - событие нажатия, содержит информацию о нажатой кнопке и данных мыши.
 */
function mouseReleased(event) {
    triggerSet.releaseMouseKey(event);
}

/**
 * Функция игрового цикла.
 * Вызывается столько раз в секунду, сколько было передано в frameRate во время инициализации.
 */
function draw() {
    background(0);                  // Обнулить фон в черный цвет
    noStroke();                     // Отключить обводку границ
    translate(-400, -400);  // Сместить изображение в левый верхний угол (WEBGL режим ведет отчет координат с центра экрана, поэтому смещаем его чтобы отчет был слева сверху)
    scale(1, 1);    // Масштабировать изображение на весь холст

    if(errorBox !== undefined) {
        // Если произошла непредвиденная ошибка по ходу игры, показываем сообщение
        errorBox.update();
        errorBox.draw();
    } else {
        try {
            // Обновить менеджер игровых состояний и менеджер виджетов
            gameStatesManager.update();
            widgetManager.update();
            // Отрисовать менеджер игровых состояний и менеджер виджетов
            gameStatesManager.draw();
            widgetManager.draw();
        } catch (exp) {
            console.log(exp);
            soundManager.stopAllSound();
            errorBox = new MessageBox(100, 100, 600,600, "#ffffff", "#e23952", exp.message, 24, 50, "#282828", LEFT, 10, 18, [exp.stack], null);
        }
    }
}