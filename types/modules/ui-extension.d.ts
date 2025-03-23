export interface BasePage {
    id: string;
    name: string;
    icon: string;
}

export interface AngularJsPage extends BasePage {
    type: "angularjs";
    template: string;
    controller: Function;
}

export interface AngularJsFactory {
    name: string;
    function: Function;
}

export interface AngularJsComponent {
    name: string;
    transclude?: boolean | string | {[slot: string]: string};
    bindings: Record<string, string>;
    template: string;
    controller: Function;
}

export interface AngularJsDirective {
    name: string;
    function: (...args: unknown[]) => {
        compile?: Function;
        controller?: Function;
        link?: Function;
        multiElement?: boolean;
        name?: string;
        priority?: number;
        require?: string | string[] | {[controller: string]: string};
        restrict?: string;
        scope?: boolean | object;
        template?: string;
        terminal?: boolean;
        transclude?: boolean | string | {[slot: string]: string};
    };
}

export interface AngularJsFilter {
    name: string;
    function: { (...args: unknown[]): Function; };
}

export interface UIExtension {
    /** A unique identifier for this UI extension. */
    id: string;
    /** Adds new sidebar entries under an "Extensions" category */
    pages?: AngularJsPage[];
    /** Add your own AngularJS services, components, directives, filters */
    providers?: {
        components?: AngularJsComponent[];
        directives?: AngularJsDirective[];
        factories?: AngularJsFactory[];
        filters?: AngularJsFilter[];
    };
}

export type UIExtensionManager = {
    registerUIExtension(extension: UIExtension): void;
    /**
     * @private
     */
    setUIReadyForExtensions(): void;
};
