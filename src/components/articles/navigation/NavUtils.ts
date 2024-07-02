type IsActiveHashParams = {
    hash: string | undefined;
    children?: string[];
    matchIfEmpty?: boolean;
};

export const IsActiveHash = (params: IsActiveHashParams) => {
    return () => {
        if (params.matchIfEmpty) {
            return window.location.hash === '' || window.location.hash === '#';
        }
        if (params.hash == undefined) {
            return false;
        }
        const children = params.children?.filter(
            (child) => window.location.hash === `#${child}`
        ) ?? [];
        return window.location.hash === `#${params.hash}`
            || children.length > 0;
    };
};
