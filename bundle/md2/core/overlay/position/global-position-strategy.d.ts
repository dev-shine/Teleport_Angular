import { PositionStrategy } from './position-strategy';
export declare class GlobalPositionStrategy implements PositionStrategy {
    private _cssPosition;
    private _top;
    private _bottom;
    private _left;
    private _right;
    private _translateX;
    private _translateY;
    fixed(): this;
    absolute(): this;
    top(value: string): this;
    left(value: string): this;
    bottom(value: string): this;
    right(value: string): this;
    centerHorizontally(offset?: string): this;
    centerVertically(offset?: string): this;
    apply(element: HTMLElement): Promise<void>;
    private _reduceTranslateValues(translateFn, values);
}
