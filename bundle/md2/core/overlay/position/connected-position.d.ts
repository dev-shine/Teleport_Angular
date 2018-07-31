export declare type HorizontalConnectionPos = 'start' | 'center' | 'end';
export declare type VerticalConnectionPos = 'top' | 'center' | 'bottom';
export interface OriginConnectionPosition {
    originX: HorizontalConnectionPos;
    originY: VerticalConnectionPos;
}
export interface OverlayConnectionPosition {
    overlayX: HorizontalConnectionPos;
    overlayY: VerticalConnectionPos;
}
export declare class ConnectionPositionPair {
    originX: HorizontalConnectionPos;
    originY: VerticalConnectionPos;
    overlayX: HorizontalConnectionPos;
    overlayY: VerticalConnectionPos;
    constructor(origin: OriginConnectionPosition, overlay: OverlayConnectionPosition);
}
