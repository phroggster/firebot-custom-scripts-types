import type { TypedEmitter } from "tiny-typed-emitter";
import type { BasicViewer } from "../viewer";

type CustomRoleInfo = {
    /** The unique identifier of the custom role. */
    id: string;
    /** The name of the custom role. */
    name: string;
};
type CustomRole = CustomRoleInfo & {
    /** The list of viewers that are a member of the custom role. */
    viewers: Array<Pick<BasicViewer, "displayName" | "id" | "username">>;
};

interface CustomRoleManagerEvents {
    "created-item": (role: CustomRole) => void;
    "deleted-item": (role: CustomRole) => void;
    "updated-item": (role: CustomRole) => void;
    "viewer-role-updated": (
        userId: string,
        roleId: string,
        action: "added" | "removed"
    ) => void;
}

export type CustomRolesManager = TypedEmitter<CustomRoleManagerEvents> & {
    deleteCustomRole(roleId: string): void;
    getCustomRoles(): CustomRole[];
    getAllCustomRolesForViewer(userId: string): CustomRoleInfo[];
    getRoleByName(name: string): CustomRole | null;
    removeAllViewersFromRole(roleId: string): void;
    removeViewerFromRole(roleId: string, userId: string): void;
    saveCustomRole(role: CustomRole): void;
    userIsInRole(
        userId: string,
        userTwitchRoles: string[] | null,
        roleIdsToCheck: string[]
    ): boolean;

    /** @private @internal */
    loadCustomRoles(): Promise<void>;
    /** @private @internal */
    refreshCustomRolesUserData(): Promise<void>;
};
