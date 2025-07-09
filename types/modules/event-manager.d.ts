import type { TypedEmitter } from "tiny-typed-emitter";

type Event<Meta extends Record<string, unknown> = Record<string, unknown>> = {
    /** An event source unique identifier for the event. */
    id: string;
    /** The human-readable name for the event. Used when searching for an event. */
    name: string;
    /** A brief human-readable description of the event. Used when searching for an event. */
    description: string;
    /** Event metadata supplied if the event is manually triggered. */
    manualMetadata: Meta | undefined;
    /** Information for the activity feed panel in Firebot when the event is triggered. */
    activityFeed?: {
        /** A FontAwesome 5 icon applicable to the event that should be displayed in the activity feed.
         * @example "fad fa-money-bill" // Streamlabs donation
         * @example "fas fa-heart"      // Twitch follow
         * @example "fas fa-star"       // Twitch sub, Prime upgrade, or gift sub upgrade
         * @example "fad fa-gift"       // Twitch gift sub
         */
        icon: string;
        /** Gets a brief description of the event trigger for the activity feed.
         * @param eventData Data that triggered the event.
         * @returns A brief markdown description of the event and data.
         * @example
         * const twitchEventSource: EventSource = {
         *   id: "twitch",
         *   // ...
         *   {
         *     id: "follow",
         *     // ...
         *     manualMetadata: {
         *       username: "firebot",
         *       userDisplayName: "Firebot",
         *       // ...
         *     },
         *     activityFeed: {
         *       icon: "fas fa-heart",
         *       getMessage: (ed) => {
         *         const showName = ed.username.toLowerCase() !== ed.userDisplayName.toLowerCase();
         *         return `**${ed.userDisplayName}${showName ? ` (${ed.username})` : ""}** followed`;
         *       },
         *     },
         *   },
         *   // ...
         * };
         */
        getMessage(eventData: Meta): string;
    };
    /** Set `true` to limit the frequency that the event can be triggered. @default false */
    cached?: boolean;
    /** Specifies an event data key to use for event filtering. Only needed if `cached` is set to `true`. An
     * `undefined` or `null` value will not use any event data for duplication filtering.
     * @default null
     * @example "username"
     * @example "fromUsername"
     */
    cacheMetaKey?: keyof Meta | null;
    /** The number of seconds that the event will be cached for to prevent duplicates. An `undefined` value will
     * stop the event from being filtered. Only needed if `cached` is set to `true`. @default undefined
     */
    cacheTtlInSecs?: number | undefined;
    /** `true` if the event requires an integration to be configured for it to be fired. @default false */
    isIntegration?: boolean;
    /** @deprecated Doesn't appear to be used; leftovers from before effect queues were added? */
    queued?: boolean;
};

export type EventSource = {
    /** The unique identifier of the event source.
     * @example "streamlabs"
     * @example "twitch"
     */
    id: string;
    /** The brief human-readable name of the event source.
     * @example "Streamlabs"
     * @example "Twitch"
     */
    name: string;
    /** A brief human-readable description of the event source.
     * @example "Donation events from Streamlabs"
     * @example "Events like Follow, Subscribe, and more from Twitch"
     */
    description?: string;
    /** The collection of events in this event source. */
    events: Array<Event>;
};

type EventTriggeredParams = {
    event: Event;
    source: EventSource;
    meta: Record<string, unknown>;
    isManual: false;
    isRetrigger: false;
};
interface EventManagerEvents {
    eventSourceRegistered: (eventSource: EventSource) => void;
    "event-triggered": (data: EventTriggeredParams) => void;
}
export type EventManager = TypedEmitter<EventManagerEvents> & {
    /** Registers the event source in Firebot, allowing it to be selected, triggered, filtered, and otherwise used. If
     * an event source with the provided `id` is already registered, nothing will be done. There is presently no way to
     * unregister an event source once it has been registered, absent unloading the custom script and restarting
     * Firebot.
     * @param eventSource An {@link EventSource} to be registered.
     * @fires eventSourceRegistered
     */
    registerEventSource(eventSource: EventSource): void;
    /** Asynchronously triggers the supplied event with the provided data.
     * @param sourceId The `id` of the {@link EventSource} containing the event.
     * @param eventId The `id` of the {@link Event} in the source to be triggered.
     * @param meta Data pertinent for the event. Defaults to `{}`, unless `isManual` is `true` and `isSimulation` is
     * not `true`, at which point it will be loaded from the event's manual metadata.
     * @param isManual Whether this is a manual simulation of the event. Defaults to `false`.
     * @param isRetrigger Whether this is a manual retriggering of the event. Defaults to `false`.
     * @param isSimulation Whether this is a manual simulation of the event with custom data. Defaults to `false`.
     * @fires event-triggered
     */
    triggerEvent(
        sourceId: string,
        eventId: string,
        meta?: Record<string, unknown>,
        isManual?: boolean,
        isRetrigger?: boolean,
        isSimulation?: boolean
    ): Promise<void>;
};
