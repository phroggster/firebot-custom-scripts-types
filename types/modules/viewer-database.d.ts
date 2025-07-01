import type { TypedEmitter } from "tiny-typed-emitter";
import type { FirebotViewer } from "../viewer";

// TODO: rank manager is not exposed to scripts, but really should be
type Rank = {
    id: string;
    name: string;
    value?: number;
};
interface ViewerDatabaseEvents {
    "viewer-database-loaded": () => void;
}

export type ViewerDatabase = TypedEmitter<ViewerDatabaseEvents> & {
    calculateAutoRanks(
        userId: string,
        trackByType?: "currency" | "metadata" | "view_time"
    ): Promise<void>;
    calculateAutoRanksByName(
        userName: string,
        trackByType?: "currency" | "metadata" | "view_time"
    ): Promise<void>;
    /** Connect the viewer database. Invoke this only after checking that
     * {@link ViewerDatabase.getViewerDb} returns `null`. which is required to know that the viewer database is
     * disconnected.
     * @see {@link ViewerDatabase.disconnectViewerDatabase}
     */
    connectViewerDatabase(): Promise<void>;
    /** Add a new viewer to the database.
     * @param userId The globally-unique user identifier.
     * @param username The user's unique user name.
     * @param displayName The user's preferred localization of their username.
     * @param profilePicUrl A URL `string` pointing to the user's profile picture.
     * @param twitchRoles A list of the Twitch role IDs that the user is a member of.
     * @param isOnline `true` if the user is presently online. @default false
     */
    createNewViewer(
        userId: string,
        username: string,
        displayName?: string,
        profilePicUrl?: string,
        twitchRoles?: string[],
        isOnline?: boolean
    ): Promise<FirebotViewer | undefined>;
    /** @returns An array of all user ***display names*** in the viewer database. */
    getAllUsernames(): Promise<string[]>;
    /** @returns An array of all viewer names, IDs, and display names in the viewer database. */
    getAllUsernamesWithIds(): Promise<
        { id: string; username: string; displayName?: string }[]
    >;
    /** @returns An array of all the viewers in the database. */
    getAllViewers(): Promise<FirebotViewer[]>;
    /** Get a viewer by unique identifier.
     * @param userId The unique identifier of a viewer to lookup.
     * @returns The `FirebotViewer` with the given userId, or `undefined` if not found or database not online.
     */
    getViewerById(userId: string): Promise<FirebotViewer | undefined>;
    /** Get a viewer by username.
     * @param username The name of the user to lookup.
     * @returns The `FirebotViewer` with the given username, or `undefined` if not found or database not online.
     */
    getViewerByUsername(username: string): Promise<FirebotViewer | undefined>;
    getViewerRankForLadder(
        userId: string,
        ladderId: string
    ): Promise<Rank | null>;
    getViewerRankForLadderByUserName(
        userName: string,
        ladderId: string
    ): Promise<Rank | null>;
    /** Determine whether the viewer database is allowed to be connected or not.
     * @returns `true` if the viewer database is allowed to be connected; otherwise, `false`.
     */
    isViewerDBOn(): boolean;
    /** Recalculate every viewer's ranks for the rank ladder with the specified ID. This operation will take some time.
     * @param ladderId The unique identifier of the rank ladder to be recalculated.
     */
    recalculateRanksForAllViewers(ladderId: string): Promise<void>;
    /** Remove a viewer from the viewer database.
     * @param userId The unique identifier of the user to remove.
     * @returns `true` if the viewer was successfully removed or didn't exist; otherwise, `false`.
     */
    removeViewer(userId: string): Promise<boolean>;
    /** Set a particular viewer's rank for the given ladder to the specified rank.
     * @param viewer The particular viewer to update.
     * @param ladderId Which ladder to update the viewer's rank upon.
     * @param newRankId The unique identifier of the rank upon the ladder.
     */
    setViewerRank(
        viewer: FirebotViewer,
        ladderId: string,
        newRankId?: string
    ): Promise<void>;
    setViewerRankById(
        userId: string,
        ladderId: string,
        rankId: string
    ): Promise<boolean>;
    /** Update a viewer's information.
     * @param viewer A `FirebotViewer` containing updated information to be saved.
     * @returns `true` if the existing viewer was updated successfully; otherwise, `false`.
     */
    updateViewer(viewer: FirebotViewer): Promise<boolean>;
    viewerHasRank(
        viewer: FirebotViewer,
        ladderId: string,
        rankId: string
    ): Promise<boolean>;
    viewerHasRankById(
        userId: string,
        ladderId: string,
        rankId: string
    ): Promise<boolean>;

    /** @internal Disconnect the viewer database. @see {@link ViewerDatabase.connectViewerDatabase} */
    disconnectViewerDatabase(): void;
    /** @internal Gets the viewer database nedb instance, if it is connected. */
    getViewerDb(): unknown | null;
};
