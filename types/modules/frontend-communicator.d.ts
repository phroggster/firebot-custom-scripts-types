/** A module for facilitating passing events to, and handling events raised by, the frontend. */
export type FrontendCommunicator = {
    /** Send a synchronous event to the frontend.
     * @template TEvent The type of event data to supply.
     * @param eventName The name of the event to send.
     * @param data Data to provide to the event handler.
     */
    send<TEvent = unknown>(
        eventName: string,
        data: TEvent
    ): void;

    /** Handle a synchronous event triggered by the frontend.
     * @template TEvent The type of data provided with the event.
     * @template TResult The type of data returned from the event handler.
     * @param eventName The name of the event to handle.
     * @param callback A function to handle the event.
     */
    on<TEvent extends Array<unknown> = [], TResult = void>(
        eventName: string,
        callback: (...args: TEvent) => TResult
    ): void;

    /** Handle an asynchronous event triggered by the frontend.
     * @template TEvent The type of data provided with the event.
     * @template TResult The type of data returned from the event handler.
     * @param eventName The name of the event to handle asynchronously.
     * @param callback A function to asynchronously handle the event.
     */
    onAsync<TEvent extends Array<unknown> = [], TResult = void>(
        eventName: string,
        callback: (...args: TEvent) => Promise<TResult>
    ): void;

    /** Send an asynchronous event to the frontend that is capable of returning a result.
     * @template TEvent The type of data provided with the event.
     * @template TResult The type of data returned from the event handler.
     * @param eventName The name of the event to send.
     * @param data The data to provide with the event.
     */
    fireEventAsync<TEvent = unknown, TResult = void>(
        eventName: string,
        data: TEvent
    ): Promise<TResult>;
};
