import type { TypedEmitter } from "tiny-typed-emitter";
import type { FirebotViewer } from "../viewer";

type EventData = {
    metadataKey: string;
    metadataValue: unknown;
    username: string;
};
interface MetadataEvents {
    "created-item": (item: EventData) => void;
    "deleted-item": (item: EventData) => void;
    "updated-item": (item: EventData) => void;
}

export type ViewerMetadataManager = TypedEmitter<MetadataEvents> & {
    /** Get the top `count` viewers for the provided `metadataKey`.
     * @param metadataKey The path to the metadata to sort by.
     * @param count The number of leading viewers to retrieve.
     */
    getTopMetadata(
        metadataKey: string,
        count: number
    ): Promise<FirebotViewer[]>;
    /** Get the viewer with the leading `metadataKey` value at the provided 1-based ranking.
     * @param metadataKey The path to the metadata to sort by.
     * @param position The 1-based ranking of the viewer to return. @default 1
     */
    getTopMetadataPosition(
        metadataKey: string,
        position?: number
    ): Promise<FirebotViewer | undefined>;
    /** Get the metadata value for the viewer with the given name at the specified path.
     * @param username The name of the user to get the metadata from.
     * @param key The key of the metadata to look within.
     * @param propertyPath The subpath to the metadata to retrieve.
     */
    getViewerMetadata(
        username: string,
        key: string,
        propertyPath?: string
    ): Promise<unknown>;
    /** Remove the metadata key from the given viewer.
     * @param username The name of the viewer to remove the metadata from.
     * @param key The metadata key to remove from the viewer.
     */
    removeViewerMetadata(username: string, key: string): Promise<void>;
    /** Set a user's metadata value.
     * @param username The name of the user to update.
     * @param key The key to assign to in the user's metadata.
     * @param value An object, optionally JSON-encoded, to assign the value from.
     * @param propertyPath A path in dot-notation to a sub-element inside of `value` to assign from. If omitted,
     * stores the provided `value` as-is.
     */
    updateViewerMetadata(
        username: string,
        key: string,
        value: unknown,
        propertyPath: string | null
    ): Promise<void>;
};
