/** The type identifier of a parsed portion of a message. */
export type MessagePartType =
    | "cheer"
    | "emote"
    | "link"
    | "text"
    | "third-party-emote";

/** The root shared type for all `MessagePart` objects. */
export interface BaseMessagePart {
    /** The type of this portion of the message. */
    type: MessagePartType;
}

/** A message part with an emote and a value of transferred wealth. */
export interface CheerPart extends BaseMessagePart {
    type: "cheer";
    /** The number of bits this message part represents. */
    amount: number;
    /** A URL to the animated cheermote image. */
    animatedUrl: string;
    /** The CSS color of the cheer amount text. */
    color: string;
    /** The name of the cheermote. */
    name: string;
    /** A URL to the static cheermote image. */
    url: string;
}

/** A message part that consists of a clickable URL, and a text representation of it. */
export interface LinkPart extends BaseMessagePart {
    type: "link";
    /** The plain-text that was interpreted as a link. */
    text: string;
    /** The resulting URL that was parsed from the text. */
    url: string;
}

/** A message part that consists of plain text. */
export interface TextPart extends BaseMessagePart {
    type: "text";
    /** `true` if a moderation tool flagged this specific message part, for e.g. a bad word. */
    flagged?: boolean;
    /** The plain-text contents of the part. */
    text: string;
}

/** The base shared interface for `EmotePart` and `ThirdPartyEmotePart`. */
interface BaseEmotePart extends BaseMessagePart {
    type: "emote" | "third-party-emote";
    /** The plain-text that the emote represents. */
    name: string;
    /** The provider of the emote. */
    origin: string; // "Twitch" | "7TV" | "BTTV" | "FFZ";
    /** A URL to the image of the emote. This image *may* be animated for third-party emotes, but
     * will always be a static image for Twitch emotes.
     */
    url: string;
}

/** A message part that consists of an emote provided by an organization other than Twitch,
 * and a text representation of it.
 *
 * Generally, viewers will need to enable a third-party extension in their browser to see
 * these emotes themselves in your chat. Without that particular extensions enabled, these
 * emotes will appear as plain-text.
 */
export interface ThirdPartyEmotePart extends BaseEmotePart {
    type: "third-party-emote";
    origin: string; // "7TV" | "BTTV" | "FFZ";
}

/** A message part that consists of an emote provided by Twitch, and a text representation
 * of it.
 */
export interface TwitchEmotePart extends BaseEmotePart {
    type: "emote";
    origin: "Twitch";
    /** A URL to the animated emote image, if one is available. */
    animatedUrl?: string | null;
    /** A unique ID for the particular Twitch emote. */
    id: string;
}

/** A message part that consists of a named, potentially animated, image. */
export type EmotePart = BaseEmotePart | ThirdPartyEmotePart | TwitchEmotePart;

/** A portion of a chat message that has been parsed. */
export type FirebotParsedMessagePart =
    | CheerPart
    | EmotePart
    | LinkPart
    | TextPart;

/** An image that appears beside the user's name. */
export interface Badge {
    /** A brief name of the badge, such as "Broadcaster", or "Subscriber". */
    title: string;
    /** A URL pointing to an image of the badge. */
    url: string;
}

/** The shared base interface for the various types of messages that Firebot could receive. */
interface BaseFirebotMessage {
    /** Whether the user is performing an action. `true` for "/me" messages; otherwise, `false` for non-action
     * messages.
     */
    action: boolean;
    /** The various badges that the user has displaying. */
    badges: Array<Badge>;
    /** The CSS color of the sender's name. */
    color?: string;
    /** The unique ID of a custom reward if the message was a redemption. */
    customRewardId?: string;
    /** The unique message identifier, generally a UUID. */
    id: string;
    /** `true` when the message is a chat announcement, typically from a mod or broadcaster. */
    isAnnouncement: boolean;
    /** `true` if the message was held up by automod for review. */
    isAutoModHeld?: boolean;
    /** `true` if the sender of the message was the bot's account in Firebot. */
    isBot?: boolean;
    /** `true` if the sender of the message was the streamer's account in Firebot. */
    isBroadcaster?: boolean;
    /** Whether the message included a transfer of bits. */
    isCheer?: boolean;
    /** @obsolete */
    isExtension: boolean;
    isFirstChat?: boolean;
    isFounder?: boolean;
    /** Whether the message was redeemed using a "highlight my message" reward. */
    isHighlighted?: boolean;
    /** `true` if the message sender is a moderator. */
    isMod?: boolean;
    /** (TODO, EventSub) Whether this viewer arrived from a raid. */
    isRaider?: boolean;
    /** `true` if the message is a reply to another message in chat. */
    isReply?: boolean;
    /** `true` if the viewer is a new viewer that has chatted at least twice in the last 30 days. */
    isReturningChatter?: boolean;
    isSharedChatMessage: boolean;
    /** `true` if the message sender is a subscriber to the channel. */
    isSubscriber?: boolean;
    /** (TODO, EventSub) Whether this viewer is considered as suspicious by Twitch. */
    isSuspiciousUser: boolean;
    isVip?: boolean;
    /** The various parsed regions of the message. */
    parts: Array<FirebotParsedMessagePart>;
    /** A URL to the sender's profile picture. */
    profilePicUrl?: string;
    /** (TODO, EventSub) The streamer name that raided in with this viewer. */
    raidingFrom?: string;
    /** The plain-text of the message. */
    rawText: string;
    replyParentMessageId?: string;
    replyParentMessageText?: string;
    replyParentMessageSenderUserId?: string;
    replyParentMessageSenderDisplayName?: string;
    /** Any standard Firebot roles that the sender belongs to. */
    roles: Array<"broadcaster" | "bot" | "founder" | "mod" | "sub" | "vip">;
    sharedChatRoomId: string | null;
    /** `true` when the streamer's user or display name appears in the message. */
    tagged: boolean;
    threadParentMessageId?: string;
    threadParentMessageSenderUserId?: string;
    threadParentMessageSenderDisplayName?: string;
    /** The user's preferred name localization, or capitalization of their username. */
    userDisplayName?: string;
    /** The unique user identifier. */
    userId: string;
    /** The user's unique name. */
    username: string;
    /** `true` if the message is a private whisper; otherwise, `false`. */
    whisper: boolean;
    /** The username of the person whom the message was whispered to. */
    whisperTarget?: string | null;

    // I think I've got all of this, but I'm probably missing something...
    [x: string]: unknown;
}

/** Properties that are meaningless for announcements. */
type AnnouncementIgnored =
    | "action"
    | "customRewardId"
    | "isCheer"
    | "isFirstChat"
    | "isHighlighted"
    | "isRaider"
    | "isSuspiciousUser"
    | "raidingFrom"
    | "whisperTarget";
/** Properties that are meaningless for automod-flagged messages. */
type AutomodIgnored =
    | "action"
    | "badges"
    | "color"
    | "customRewardId"
    | "isAnnouncement"
    | "isBot"
    | "isBroadcaster"
    | "isCheer"
    | "isExtension"
    | "isFirstChat"
    | "isFounder"
    | "isHighlighted"
    | "isMod"
    | "isRaider"
    | "isReturningChatter"
    | "isSharedChatMessage"
    | "isSubscriber"
    | "isSuspiciousUser"
    | "isVip"
    | "raidingFrom"
    | "sharedChatRoomId"
    | "whisper"
    | "whisperTarget";
/** Properties that are used for message replies. */
type ReplyProps =
    | "isReply"
    | "replyParentMessageId"
    | "replyParentMessageText"
    | "replyParentMessageSenderUserId"
    | "replyParentMessageSenderDisplayName"
    | "threadParentMessageId"
    | "threadParentMessageSenderUserId"
    | "threadParentMessageSenderDisplayName";
/** Properties that are meaningless for whispered messages. */
type WhisperIgnored =
    | "customRewardId"
    | "isAnnouncement"
    | "isAutoModHeld"
    | "isCheer"
    | "isHighlighted"
    | "isSharedChatMessage"
    | "sharedChatRoomId";
/** A Firebot announcement message. */
interface Announcement
    extends Omit<BaseFirebotMessage, AnnouncementIgnored | ReplyProps> {
    isAnnouncement: true;
    whisper: false;
    /** The designated color of the announcement. */
    announcementColor: "PRIMARY" | "BLUE" | "GREEN" | "ORANGE" | "PURPLE";
}
/** A message flagged for moderator review. */
interface AutoModMessage
    extends Omit<BaseFirebotMessage, AutomodIgnored | ReplyProps> {
    isAutoModHeld: true;
    /** The reported reason that a moderation tool held the message. */
    autoModReason: string;
    /** The status of the automod hold on the message. */
    autoModStatus: "approved" | "denied" | "expired" | "pending";
}
/** A plain ol' chat message. */
interface FirebotMessage extends Omit<BaseFirebotMessage, "whisperTarget"> {
    isAnnouncement: false;
    whisper: false;
}
/** A private message shared between two parties. */
interface FirebotWhisper extends Omit<BaseFirebotMessage, WhisperIgnored> {
    isAnnouncement: false;
    whisper: true;
    whisperTarget: string;
}
export type FirebotChatMessage =
    | Announcement
    | AutoModMessage
    | FirebotMessage
    | FirebotWhisper;
