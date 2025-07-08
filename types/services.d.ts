/**
 * Services and other frontend helpers capable of being injected by Angular
 *
 * The auto-injected parameter names should (generally) match the provided type, but
 * with a lower-case initial letter. See JSDoc commentary for interface specifics.
 */

import type { LogCallback, LogLevel } from "./modules/logger";

/** The BackendCommunicator server, accessible via an auto-injected `backendCommunicator`
 * parameter. Defined in `Firebot/gui/app/services/backend-communicator.service.js`
 */
export interface BackendCommunicator {
    fireEventAsync(type: string, ...data: unknown[]): Promise<unknown>;
    fireEventSync(type: string, ...data: unknown[]): unknown;
    fireEvent(type: string, ...data: unknown[]): void;
    /**
     * @returns An UUID for the event listener (that can't really be used for anything).
     */
    on(
        eventName: string,
        callback: (...data: unknown[]) => void,
        async?: boolean
    ): string;
    /**
     * @returns An UUID for the event listener (that can't really be used for anything).
     */
    onAsync(
        eventName: string,
        callback: (...data: unknown[]) => Promise<void>
    ): string;
    /**
     * @see fireEvent
     */
    send(type: string, ...data: unknown[]): void;
}

type FirebotFont = {
    filename: string;
    format: "opentype" | "truetype" | "woff" | "woff2";
    name: string;
    path: string;
};
/** The FontManager service, accessible via an auto-injected `fontManager` parameter.
 * Defined in `Firebot/gui/app/services/font-manager.service.js`
 */
export interface FontManager {
    getFont(name: string): FirebotFont | undefined;
    getFontCssPath(): string;
    getFontFolderPath(): string;
    getInstalledFonts(): FirebotFont[];
    installFont(filepath: string): Promise<boolean>;
    removeFont(name: string): Promise<void>;
}

interface LogMethod {
    (level: LogLevel, msg: string, callback?: LogCallback | null): Logger;
    (
        level: LogLevel,
        msg: string,
        meta: any,
        callback?: LogCallback | null
    ): Logger;
    (level: LogLevel, msg: string, ...meta: any[]): Logger;
}
interface LeveledLogMethod {
    (msg: string, callback?: LogCallback | null): Logger;
    (msg: string, meta: any, callback?: LogCallback | null): Logger;
    (msg: string, ...meta: any[]): Logger;
}
/** The frontend logger service, accessible via an auto-injected `logger` parameter.
 * Defined in `Firebot/gui/app/services/logger.service.js`
 */
export interface Logger {
    /** Write the provided message to the specified Firebot renderer log.
     * @param level The {@link LogLevel} to write the renderer message to.
     * @param msg The message to write to the renderer log.
     * @param meta Additional information to write to the log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     * @returns The Firebot application logging instance.
     */
    log: LogMethod;

    /** Write the provided error message to the Firebot renderer log.
     * @param msg The message to write to the renderer error log.
     * @param meta Additional information to write to the error log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     * @returns The Firebot application logging instance.
     */
    error: LeveledLogMethod;
    /** Write the provided warning message to the Firebot renderer log.
     * @param msg The message to write to the renderer warning log.
     * @param meta Additional information to write to the warning log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     * @returns The Firebot application logging instance.
     */
    warn: LeveledLogMethod;
    /** Writes the provided info message to the Firebot renderer log.
     * @param msg The message to write to the renderer info log.
     * @param meta Additional information to write to the info log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     * @returns The Firebot application logging instance.
     */
    info: LeveledLogMethod;
    /** Write the provided verbose message to the Firebot renderer log.
     * @param msg The message to write to the renderer verbose log.
     * @param meta Additional information to write to the verbose log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     * @returns The Firebot application logging instance.
     */
    verbose: LeveledLogMethod;
    /** Write the provided debug message to the Firebot renderer log.
     * @param msg The message to write to the renderer debug log.
     * @param meta Additional information to write to the debug log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     * @returns The Firebot application logging instance.
     */
    debug: LeveledLogMethod;
    /** Write the provided silly message to the Firebot renderer log.
     * @param msg The message to write to the renderer silly log.
     * @param meta Additional information to write to the silly log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     * @returns The Firebot application logging instance.
     */
    silly: LeveledLogMethod;
}

/**
 * @see {@link https://getbootstrap.com/docs/3.4/css/#buttons-options}
 * @see {@link https://getbootstrap.com/docs/3.4/css/#buttons-sizes}
 */
type BootstrapButtonClass =
    | "btn-default"
    | "btn-primary"
    | "btn-success"
    | "btn-info"
    | "btn-warning"
    | "btn-danger"
    | "btn-link"
    | "btn-large"
    | "btn-sm"
    | "btn-xs";
// | "btn-secondary"
// | "btn-dark"
// | "btn-light"
// TODO: these are all conflicting; should split style vs size + enforce none/either/both
type ButtonClass<
    T extends string,
    U extends string = BootstrapButtonClass
> = T extends U
    ? T
    : T extends `${U} ${infer R}`
    ? T extends `${infer F} ${R}`
        ? `${F} ${ButtonClass<R, Exclude<U, F>>}`
        : never
    : U;
type ModalSize = "sm" | "md" | "lg";
type ConfirmModalRequest<
    CancelType extends string = "btn-link",
    ConfirmType extends string = "btn-danger"
> = {
    /** The question to present to the user. */
    question: string;
    /** The title to display in the modal's header. */
    title: string;

    /** (*optional*) The class names to apply to the cancel button. @default "btn-link" */
    cancelBtnType?: ButtonClass<CancelType>;
    /** (*optional*) The text to display on the cancel button. @default "Cancel" */
    cancelLabel?: string;
    /** (*optional*) The class names to apply to the confirm button. @default "btn-danger" */
    confirmBtnType?: ButtonClass<ConfirmType>;
    /** (*optional*) The text to display on the confirm button. @default "Yes" */
    confirmLabel?: string;
    /** (*optional*) Text to present as an extended description beneath the question. @default undefined */
    tip?: string | null;
};
type GetIdEntryOptions<T> = {
    model?: T;
    idLabel?: string;
    inputPlaceholder?: string;
    label?: string;
    saveText?: string;
    steps?: string;
};
type ShowModalCloseCallback<
    Data extends Record<string, unknown>,
    Actions extends string
> = (
    response: Data & {
        action: Actions;
    }
) => void;
interface ShowModalComponent {
    /** The unique component ID to use for displaying and managing the modal. */
    component: string;
}
interface ShowModalController {
    /** A path to the html template for the modal. */
    templateUrl: string;
    /** A function to use for controlling the modal.
     * @param args Auto-injected controller function arguments.
     */
    controllerFunc(...args: unknown[]): void;
}
/** Data for the `Services.Utility.showModal` function.
 * @template Data The data type that the modal represents.
 * @template Actions The union of potential `string` actions, one of which
 * should be supplied to the `closeCallback` when the modal is closed.
 * @see {@link Utility.showModal}
 */
type ShowModalContext<
    Data extends Record<string, unknown>,
    Actions extends string
> = (ShowModalComponent | ShowModalController) & {
    autoSlide?: boolean;
    backdrop?: boolean | "static";
    breadcrumbName?: string;
    keyboard?: boolean;
    resolveObj: {
        [K in keyof Data]: () => Data[K];
    };
    size?: ModalSize;
    windowClass?: string;

    /** The function invoked when the modal is closed. */
    closeCallback?: ShowModalCloseCallback<Data, Actions>;
    /** The callback invoked when the modal is dismissed. */
    dismissCallback?: () => void;
};
/** The modal factory, accessible via an auto-injected `modalFactory` parameter.
 * Defined in `Firebot/gui/app/services/modal-factory.service.js`
 *
 * TODO: this service is a work-in-progress
 */
export interface ModalFactory {
    openDateModal(options: unknown, callback: (model: unknown) => void): void;
    openGetIdEntryModal<T = unknown>(
        options: GetIdEntryOptions<T>,
        callback: (model: unknown) => void
    ): void;
    openGetInputModal(options: unknown, callback: unknown): void;
    openSelectModal(options: unknown, callback: unknown): void;
    openViewerSearchModal(options: unknown, callback: unknown): void;
    showConfirmationModal(
        confirmModalRequest: ConfirmModalRequest
    ): Promise<boolean>;
    /** @internal */
    showDownloadModal(): void;
    showEditEffectModal(
        effect?: unknown,
        index?: unknown,
        triggerType?: unknown,
        closeCallback?: unknown,
        triggerMeta?: unknown,
        isNew?: unknown
    ): void;
    showErrorDetailModal(
        title: unknown,
        details: unknown,
        modalSize?: ModalSize
    ): void;
    showErrorModal(errorMessage: string): void;
    showInfoModal(infoMessage: string): void;
    showOverlayEventsModal(): void;
    showOverlayInfoModal(instanceName?: string): void;
    /** @internal */
    showSetupWizard(allowExit?: boolean): void;
    /** @internal */
    showUpdatedModal(): void;
}
/** The modal service, accessible via an auto-injected `modalService` parameter.
 * Defined in `Firebot/gui/app/services/modal.service.js`
 */
export interface ModalService {
    dismissToModalId(modalId: string): void;
    getOpenModals(): Array<{ id: string; name: string }>;
    saveAllOpenModals(): void;
    /** Displays a modal UI element, which allows for adding or editing complex data types on-demand.
     * @template Data The data type that the modal represents.
     * @template Actions The union of potential string actions that the modal should return should it not be dismissed.
     * @param context Information about which modal to display, how to display it, and callbacks for how to handle its
     * closure or dismissal.
     */
    showModal<
        Data extends Record<string, unknown> = Record<string, unknown>,
        Actions extends string = string
    >(
        showModalContext: ShowModalContext<Data, Actions>
    ): void;
    updateNameForOpenModal(newName: string, modalId: string): void;
}

/** Data for the `NgToast.create` function. @see {@link NgToast.create} */
interface ToastData {
    /** An HTML element or the raw text to display on the toast. */
    content: string;

    /** (Optional; default "") Additional classnames to append to the toast. */
    additionalClasses?: string;
    /** (Optional; default "") Built-in animation type for toast messages. */
    animation?: "slide" | "fade" | "";
    /** (Optional; default: "success") An ngToast/Bootstrap-css class name to
     * use for the toast.
     */
    className?: "danger" | "info" | "success" | "warning";
    /** (Optional; default false) Whether to add a close button to the toast.
     */
    dismissButton?: boolean;
    /** (Optional; default "&times;") HTML of the close button to append. */
    dismissButtonHtml?: string;
    /** (Optional; default true) Allows toast messages to be removed on mouse
     * click.
     */
    dismissOnClick?: boolean;
    /** (Optional; default "right") Horizontal position of the toast message.
     */
    horizontalPosition?: "center" | "left" | "right";
    /** (Optional; default 4000) How long the toast should cook for, in
     * milliseconds.
     */
    timeout?: number;
    /** (Optional; default "top") Vertical position of the toast message. */
    verticalPosition?: "bottom" | "top";

    /** (Optional) A callback that will be triggered whenever the toast message
     * is dismissed.
     */
    onDismiss?(toastData: Omit<ToastData, "onDismiss">): void;
}
/** The NgToast service, accessible via an auto-injected `ngToast` parameter.
 * Defined in the external module `ng-toast`, injected by
 * `src/gui/app/app-main.js`.
 * @license MIT
 */
export interface NgToast {
    /** Creates some toast. That is, displays a short-lived notification alert
     * message over top of the application. Also accessible via
     * `frontendCommunicator.send("showToast", toastData);`
     * @param toastData The message text, HTML, or the ToastData to be
     * displayed.
     * @example
     * function (logger: Logger, ngToast: NgToast): void {
     *     // displays a basic "Hello world" toast.
     *     ngToast.create("Hello world!");
     *
     *     // displays a customized "Hello world" toast.
     *     ngToast.create({
     *         additionalClasses: "world-greeter",
     *         animation: "slide",
     *         className: "info",
     *         content: '<p><img alt="small Firebot logo" src="https://cdn.betterttv.net/emote/67bd9845285714ef44b6de5b/1x.webp"> Hello world!</p>',
     *         timeout: 10 * 1000,
     *         onDismiss: (_td) => logger.silly("The world has officially been greeted"),
     *     });
     * }
     */
    create(toastData: string | ToastData): void;
}

/** The RootScope service, accessible via an auto-injected `$rootScope` parameter.
 * Defined in the external AngularJS module, and extended by `Firebot/gui/app/app-main.js`.
 * @see https://docs.angularjs.org/api/ng/service/$rootScope
 */
export interface RootScope {
    showSpinner: boolean;
    $broadcast(name: string, ...data: unknown[]): unknown;
    /** Copy the provided text into the user's clipboard.
     * @param text The text to copy to the clipboard.
     */
    copyTextToClipboard(text: string): void;
    /** Open the given URL in an external web browser.
     * @param url The URL to open in an external web browser.
     */
    openLinkExternally(url: string): void;
    /** Paste the user's clipboard data into the element with the given ID.
     * @param elementId The unique ID of the element to receive the clipboard's contents.
     * @param shouldUnfocus `true` or `null` to remove focus from the element, `false` to leave
     * it in focus.
     */
    pasteClipboard(elementId: string, shouldUnfocus?: boolean): void;
}

/** The Timeout service, accessible via an auto-injected `$timeout` parameter.
 * Defined in the external AngularJS module.
 * @see https://docs.angularjs.org/api/ng/service/$timeout
 */
export interface Timeout {
    /** Queues a task to execute at a later point in time.
     * @template TResult The return type of the callback function.
     * @template Args The optional arguments supplied to the callback function.
     * @param fn The callback function to be invoked once the timeout expires.
     * @param delay (optional; default `0`) How long to wait in milliseconds until invoking fn.
     * @param invokeApply (optional; default `true`) If set to `false` skips model dirty
     * checking, otherwise will invoke `callback` within the `$apply` block.
     * @param Pass (optional; default `[]`) Parameters to supply to the `callback` function.
     */
    <TResult = void, Args extends unknown[] = unknown[]>(
        fn: (...args: Args) => TResult,
        delay?: number,
        invokeApply?: boolean,
        ...Pass: Args
    ): Promise<TResult>;
    /** Cancels a pending `$timeout` task.
     * @param promise The result of a prior `$timeout()` invocation.
     * @returns `true` if the task has not yet executed and was successfully cancelled.
     */
    cancel<TResult = void>(promise: Promise<TResult>): boolean;
}

/** The Utility service, accessible via an auto-injected `utilityService`
 * parameter. Defined in `Firebot/gui/app/services/utility.service.js`
 */
export interface Utility {
    /** Check if an item is in an array.
     * @param array The array to check whether it contains `element`.
     * @param element The element to check for in the `array`.
     * @returns `true` if `array` is defined, non-null, and contains `element`; otherwise, `false`.
     */
    arrayContainsElement<T = unknown>(
        array: ReadonlyArray<T> | null | undefined,
        element: T
    ): boolean;
    /** Capitalize the first letter of a word or phrase, and lower-case every other letter.
     * @param word A word or phrase where the first letter should be capitalized.
     * @returns The word or phrase with the first letter capitalized and the remainder lower-cased.
     * @example
     * utility.capitalize("hello, WORLD!"); // returns "Hello, world!"
     */
    capitalize(word: string): string;
    debounce<Args extends unknown[] = unknown[]>(
        func: (...args: Args) => void,
        wait: number,
        immediate?: boolean
    ): (...args: Args) => void;
    /** @returns An RFC4122-compliant version 4 universally-unique identifier. */
    generateUuid(): string;
    /** Add or remove an element from an array. Used by effects that make use of lists of checkboxes.
     * @param array An array of selected items.
     * @param element An element to either add to or remove from the `array`.
     * @returns The array of selected items, with `element` either added or removed.
     */
    getNewArrayWithToggledElement<T = unknown>(
        array: Array<T> | null | undefined,
        element: T
    ): Array<T>;

    /** Does nothing. @deprecated @see {@link ModalService.showModal} */
    addSlidingModel(promise: Promise<unknown>): void;
    /** @deprecated @see {@link ModalService.dismissToModalId} */
    closeToModalId(modalId: string): void;
    /** @deprecated @see {@link ModalService.getOpenModals} */
    getSlidingModalNamesAndIds(): {
        name: string;
        id: string;
    }[];
    /** Does nothing. @deprecated @internal */
    noop(): void;
    /** @deprecated @see {@link ModalFactory.openGetIdEntryModal} */
    openGetIdEntyModal<T = unknown>(
        options: GetIdEntryOptions<T>,
        callback: (model: unknown) => void
    ): void;
    /** Does nothing. @deprecated */
    removeSlidingModal(): void;
    /** @deprecated @see {@link ModalService.saveAllOpenModals} */
    saveAllSlidingModals(): void;
    /** @deprecated @see {@link ModalFactory.showConfirmationModal} */
    showConfirmationModal(
        confirmModalRequest: ConfirmModalRequest
    ): Promise<boolean>;
    /** @deprecated @see {@link ModalService.showModal} */
    showModal<
        Data extends Record<string, unknown> = Record<string, unknown>,
        Actions extends string = string
    >(
        context: ShowModalContext<Data, Actions>
    ): void;
    /** @deprecated @see {@link ModalFactory.showOverlayInfoModal} */
    showOverlayInfoModal(overlayInstance?: string): void;
    /** @deprecated @see {@link ModalFactory.showSetupWizard} */
    showSetupWizard(allowExit?: boolean): void;
    /** @deprecated @see {@link ModalService.updateNameForOpenModal} */
    updateNameForSlidingModal(newName: string, modalId: string): void;

    // TODO: openGetInputModal (L104+)
}
