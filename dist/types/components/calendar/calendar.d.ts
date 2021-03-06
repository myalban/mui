export declare class Calendar {
    year: number;
    month: number;
    day: number;
    type: string;
    week: number;
    weekday: number;
    vshape: boolean;
    lunar: boolean;
    watermark: boolean;
    gesture: boolean;
    choice: number;
    start: string;
    end: string;
    data: any;
    current: any;
    range: any;
    el: HTMLElement;
    componentWillLoad(): void;
    rangeHandle(value: any): void;
    watermarkHandle(value: any): void;
    startHandle(value: any): void;
    endHandle(value: any): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    bindObverse(): void;
    addObverse($doms: any, callback: any): void;
    generateThreeGroupData(): any[];
    onDateChange(type: any): void;
    private getCssClassMap;
    private getCssClassMap1;
    private getCssClassMap2;
    toggleView(): void;
    renderDiff(): void;
    itemClick(day: any): void;
    render(): any;
    init(option: any): Promise<HTMLHcCalendarElement>;
}
