export declare class ViewportRuler {
    getViewportRect(): ClientRect;
    getViewportScrollPosition(documentRect?: ClientRect): {
        top: number;
        left: number;
    };
}
