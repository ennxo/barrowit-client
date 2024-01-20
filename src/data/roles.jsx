export const adminRoles = ["admin", "editor", "viewer"]

export const permissions = {
    "user.edit": ["admin", "editor"],
    "user.audit": ["admin"],
    "user.read" : Object.values(adminRoles)
}