import type { JsonDB } from "node-json-db";
import type { ListenerSignature, TypedEmitter } from "tiny-typed-emitter";

interface DbItem extends Record<string, unknown> {
    id: string;
    name: string;
}

interface DefaultEvents<T extends DbItem = DbItem> {
    /** An item was added to the database. @event DefaultEvents#created-item */
    "created-item": (item: T) => void;
    /** All items were removed from the database. @event DefaultEvents#deleted-all-items */
    "deleted-all-items": () => void;
    /** An item was deleted from the database. @event DefaultEvents#deleted-item */
    "deleted-item": (item: T) => void;
    /** The database cache was (re-)loaded from disk. @event DefaultEvents#loaded-items */
    "loaded-items": (items: T[]) => void;
    /** The contents of the database were replaced. @event DefaultEvents#saved-all-items */
    "saved-all-items": (items: T[]) => void;
    /** An item was updated in the database. @event DefaultEvents#updated-item */
    "updated-item": (item: T) => void;
}

/** A class for interacting with collections of data that persist on disk via node-json-db.
 * @abstract
 * @template T The type of database items that this manager works with.
 * @template E The typing of any non-standard events that may be emitted beyond the default events.
 */
export class JsonDbManager<
    T extends DbItem,
    E extends ListenerSignature<E> = {}
> extends TypedEmitter<E & DefaultEvents<T>> {
    /**
     * @protected
     * @param type The name of the specific database item type, e.g. "Counter" or "Timer".
     * @param path The base name of the database file on-disk. This will be created inside of the Firebot user profile
     * if it does not exist already, e.g. "/counters/counters" or "/timers".
     */
    constructor(type: string, path: string);

    /** @protected The database instance. */
    protected db: JsonDB;
    /** @protected A cache of the database items. This is a record of unique item IDs to their instances. */
    protected items: { [key: string]: T };
    /** @protected The subpath to the base name of the database file inside of the Firebot user profile. */
    protected path: string;
    /** @protected The name of the specific database item type. */
    protected type: string;

    /** Removes all elements from the database.
     * @fires DefaultEvents#deleted-all-items
     */
    deleteAllItems(): void;
    /** Deletes a particular element from the database.
     * @param itemId The unique identifier of the element to delete.
     * @returns `true` if the element existed and was successfully removed; otherwise, `false`.
     * @fires DefaultEvents#deleted-item
     */
    deleteItem(itemId: string): boolean;
    /** @pure @returns All elements in the database cache. */
    getAllItems(): T[];
    /** Get an item from the database cache by ID.
     * @param itemId The unique ID of the item to retrieve.
     * @returns The item in the database with the provided ID, or `null` if the item could not be found.
     * @pure
     */
    getItem(itemId: string): T | null;
    /** Get an item from the database cache by name.
     * @param itemName The name of the item to retrieve.
     * @returns The item in the database with the provided name, or `null` if the item could not be found.
     * @pure
     */
    getItemByName(itemName: string): T | null;
    /** Refresh the internal cache of items in the database from disk.
     * @fires DefaultEvents#loaded-items
     */
    loadItems(): void;
    /** Replace the contents of the database with the provided items.
     * @param allItems The new contents of the database to write to disk.
     * @fires DefaultEvents#saved-all-items
     */
    saveAllItems(allItems: T[]): void;
    /** Create or update an existing item in the database.
     * @param item The item to create or update in the database.
     * @fires DefaultEvents#created-item
     * @fires DefaultEvents#updated-item
     */
    saveItem(item: Omit<T, "id"> & { id?: string }): T | null;
}
