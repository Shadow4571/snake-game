// ID всех текстур в игре
const UI_MenuButton_Normal = 0;
const UI_MenuButton_Hovered = 1;
const UI_MenuButton_Pressed = 2;
const UI_ButtonSmall_Normal = 3;
const UI_ButtonSmall_Hovered = 4;
const UI_ButtonSmall_Pressed = 5;
const UI_Bar_Simple_Normal = 6;
const UI_Bar_Simple_Overlay = 7;
const UI_Banner_Normal = 8;
const UI_Panel_Normal = 9;
const UI_Panel_Simple = 10;
const UI_Panel_Records = 11;
const UI_Record_Entry = 12;
const UI_Logo_Static = 13;
const UI_Background = 14;

const Map_Static = 20;
const Map_Ground_Sand_01 = 21;
const Map_Ground_Sand_02 = 22;
const Map_Ground_Sand_03 = 23;

const Snake_Head = 30;
const Snake_Body = 31;
const Snake_Tail = 32;

const Food_Apple = 40;

class TextureLoader {
    // Локальные пути до всех текстур
    static TUI_MenuButton_Normal_Path = "./res/textures/ui/buttons/button_menu_normal.png";
    static TUI_MenuButton_Hovered_Path = "./res/textures/ui/buttons/button_menu_hovered.png";
    static TUI_MenuButton_Pressed_Path = "./res/textures/ui/buttons/button_menu_pressed.png";
    static TUI_ButtonSmall_Normal_Path = "./res/textures/ui/buttons/button_small_normal.png";
    static TUI_ButtonSmall_Hovered_Path = "./res/textures/ui/buttons/button_small_hovered.png";
    static TUI_ButtonSmall_Pressed_Path = "./res/textures/ui/buttons/button_small_pressed.png";
    static TUI_Bar_Simple_Normal_Path = "./res/textures/ui/bar/bar_simple_normal.png";
    static TUI_Bar_Simple_Overlay_Path = "./res/textures/ui/bar/bar_simple_overlay.png";
    static TUI_Logo_Static_Path = "./res/textures/logo/logo.png";
    static TUI_Banner_Normal_Path = "./res/textures/ui/box/banner_normal.png";
    static TUI_Panel_Normal_Path = "./res/textures/ui/box/panel_normal.png";
    static TUI_Panel_Simple_Path = "./res/textures/ui/box/panel_simple.png";
    static TUI_Panel_Records_Path = "./res/textures/ui/box/panel_records.png";
    static TUI_Record_Entry_Path = "./res/textures/ui/box/panel_record_entry.png";
    static TUI_Background_Path = './res/background/snake_background.mp4';

    static TMap_Static_Path = "./res/textures/map/map_static.png";
    static TMap_Ground_Sand_01_Path = "./res/textures/map/ground_sand_01.png";
    static TMap_Ground_Sand_02_Path = "./res/textures/map/ground_sand_02.png";
    static TMap_Ground_Sand_03_Path = "./res/textures/map/ground_sand_03.png";

    static TSnake_Head_Path = "./res/textures/snake/snake_head.png";
    static TSnake_Body_Path = "./res/textures/snake/snake_body.png";
    static TSnake_Tail_Path = "./res/textures/snake/snake_tail.png";

    static TFood_Apple_Path = "./res/textures/food/food_apple.png";

    constructor() {
        // Создаем карту ключ-значение. В ней мы храним ID текустуры и путь до нее
        this._texturePathMap = new Map();
        this._texturePathMap.set(UI_MenuButton_Normal, TextureLoader.TUI_MenuButton_Normal_Path);
        this._texturePathMap.set(UI_MenuButton_Hovered, TextureLoader.TUI_MenuButton_Hovered_Path);
        this._texturePathMap.set(UI_MenuButton_Pressed, TextureLoader.TUI_MenuButton_Pressed_Path);
        this._texturePathMap.set(UI_ButtonSmall_Normal, TextureLoader.TUI_ButtonSmall_Normal_Path);
        this._texturePathMap.set(UI_ButtonSmall_Hovered, TextureLoader.TUI_ButtonSmall_Hovered_Path);
        this._texturePathMap.set(UI_ButtonSmall_Pressed, TextureLoader.TUI_ButtonSmall_Pressed_Path);
        this._texturePathMap.set(UI_Logo_Static, TextureLoader.TUI_Logo_Static_Path);
        this._texturePathMap.set(UI_Banner_Normal, TextureLoader.TUI_Banner_Normal_Path);
        this._texturePathMap.set(UI_Panel_Normal, TextureLoader.TUI_Panel_Normal_Path);
        this._texturePathMap.set(UI_Bar_Simple_Normal, TextureLoader.TUI_Bar_Simple_Normal_Path);
        this._texturePathMap.set(UI_Bar_Simple_Overlay, TextureLoader.TUI_Bar_Simple_Overlay_Path);
        this._texturePathMap.set(UI_Panel_Simple, TextureLoader.TUI_Panel_Simple_Path);
        this._texturePathMap.set(UI_Panel_Records, TextureLoader.TUI_Panel_Records_Path);
        this._texturePathMap.set(UI_Record_Entry, TextureLoader.TUI_Record_Entry_Path);
        this._texturePathMap.set(UI_Background, TextureLoader.TUI_Background_Path);

        this._texturePathMap.set(Map_Static, TextureLoader.TMap_Static_Path);
        this._texturePathMap.set(Map_Ground_Sand_01, TextureLoader.TMap_Ground_Sand_01_Path);
        this._texturePathMap.set(Map_Ground_Sand_02, TextureLoader.TMap_Ground_Sand_02_Path);
        this._texturePathMap.set(Map_Ground_Sand_03, TextureLoader.TMap_Ground_Sand_03_Path);

        this._texturePathMap.set(Snake_Head, TextureLoader.TSnake_Head_Path);
        this._texturePathMap.set(Snake_Body, TextureLoader.TSnake_Body_Path);
        this._texturePathMap.set(Snake_Tail, TextureLoader.TSnake_Tail_Path);

        this._texturePathMap.set(Food_Apple, TextureLoader.TFood_Apple_Path);
    }

    /**
     * Загрузить текустуру по ID.
     * @param id - ID текстуры
     * @returns p5.Image
     */
    loadTextureByID(id) {
        if(this._texturePathMap.has(id)) {
            return loadImage(this._texturePathMap.get(id));
        }

        throw new Error("This texture name does not have path to self.");
    }

    /**
     * Загрузить видео по ID
     * @param id - ID видео
     * @returns p5.Image
     */
    loadVideoByID(id) {
        if(this._texturePathMap.has(id)) {
            let vid = createVideo([this._texturePathMap.get(id)]);
            vid.elt.muted = true;
            vid.loop();
            vid.hide();
            return vid;
        }

        throw new Error("This video does not have path to self.");
    }
}