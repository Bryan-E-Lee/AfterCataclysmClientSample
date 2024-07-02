export const CreateHashNavigator = (hash: string) => () => document.getElementById(hash)?.scrollIntoView({
    behavior: "smooth",
    inline: "nearest",
});