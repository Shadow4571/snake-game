/**
 * Класс менеджера текстур. Загружает текстуры с помощью загрузчика текстур.
 * Содержит все загруженные текстуры в списке, их можно получить по ID (уникальному идентификатору).
 */
class TextureManager {
    constructor() {
        this._textureLoader = new TextureLoader();      // Загрузчик текстур
        this._textureList = new Array(50);  // Список под 50 различных текустур

        this._textureList[UI_MenuButton_Normal] = this._textureLoader.loadTextureByID(UI_MenuButton_Normal);
        this._textureList[UI_MenuButton_Hovered] = this._textureLoader.loadTextureByID(UI_MenuButton_Hovered);
        this._textureList[UI_MenuButton_Pressed] = this._textureLoader.loadTextureByID(UI_MenuButton_Pressed);
        this._textureList[UI_ButtonSmall_Normal] = this._textureLoader.loadTextureByID(UI_ButtonSmall_Normal);
        this._textureList[UI_ButtonSmall_Hovered] = this._textureLoader.loadTextureByID(UI_ButtonSmall_Hovered);
        this._textureList[UI_ButtonSmall_Pressed] = this._textureLoader.loadTextureByID(UI_ButtonSmall_Pressed);
        this._textureList[UI_Logo_Static] = this._textureLoader.loadTextureByID(UI_Logo_Static);
        this._textureList[UI_Banner_Normal] = this._textureLoader.loadTextureByID(UI_Banner_Normal);
        this._textureList[UI_Panel_Normal] = this._textureLoader.loadTextureByID(UI_Panel_Normal);
        this._textureList[UI_Bar_Simple_Normal] = this._textureLoader.loadTextureByID(UI_Bar_Simple_Normal);
        this._textureList[UI_Bar_Simple_Overlay] = this._textureLoader.loadTextureByID(UI_Bar_Simple_Overlay);
        this._textureList[UI_Panel_Simple] = this._textureLoader.loadTextureByID(UI_Panel_Simple);
        this._textureList[UI_Panel_Records] = this._textureLoader.loadTextureByID(UI_Panel_Records);
        this._textureList[UI_Record_Entry] = this._textureLoader.loadTextureByID(UI_Record_Entry);
        this._textureList[UI_Background] = this._textureLoader.loadVideoByID(UI_Background);

        this._textureList[Map_Static] = this._textureLoader.loadTextureByID(Map_Static);
        this._textureList[Map_Ground_Sand_01] = this._textureLoader.loadTextureByID(Map_Ground_Sand_01);
        this._textureList[Map_Ground_Sand_02] = this._textureLoader.loadTextureByID(Map_Ground_Sand_02);
        this._textureList[Map_Ground_Sand_03] = this._textureLoader.loadTextureByID(Map_Ground_Sand_03);

        this._textureList[Snake_Head] = this._textureLoader.loadTextureByID(Snake_Head);
        this._textureList[Snake_Body] = this._textureLoader.loadTextureByID(Snake_Body);
        this._textureList[Snake_Tail] = this._textureLoader.loadTextureByID(Snake_Tail);

        this._textureList[Food_Apple] = this._textureLoader.loadTextureByID(Food_Apple);
    }

    /**
     * Функция возвращает текстуру по ID.
     * @param id - ID текустуры.
     * @returns p5.Image
     */
    getTexture(id) {
        if(id < 0 || id > this._textureList.length) {
            throw new Error("Index out of bound textures list.");
        }

        return this._textureList[id];
    }
}