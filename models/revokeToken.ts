

export const revokedTokens: Set<string> = new Set();




export const addRevokeToken = (email: string): void => {
    revokedTokens.add(email);
}



export const isRevokedToken = (email: string): boolean => {
    return revokedTokens.has(email);
}
