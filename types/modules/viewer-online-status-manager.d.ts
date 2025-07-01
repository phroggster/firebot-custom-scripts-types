import type { BasicViewer, FirebotViewer } from "../viewer";

export type ViewerOnlineStatusManager = {
    calcAllViewersOnlineMinutes(): Promise<void>;
    calcViewerOnlineMinutes(viewer: FirebotViewer): Promise<void>;
    getOnlineViewers(): Promise<FirebotViewer[]>;
    getTopViewTimeViewers(count: number): Promise<FirebotViewer[]>;
    getViewerOnlineMinutes(
        username: string
    ): Promise<number | never | undefined>;
    setAllChatViewersOnline(): Promise<void>;
    setAllViewersOffline(): Promise<void>;
    setChatViewerOffline(userId: string): Promise<void>;
    setChatViewerOnline(viewer: BasicViewer): Promise<void>;
    setLastSeenDateTime(): Promise<void>;
    viewerViewTimeUpdate(
        viewer: FirebotViewer,
        previousTotalMinutes: number,
        newTotalMinutes: number
    ): void;
};
