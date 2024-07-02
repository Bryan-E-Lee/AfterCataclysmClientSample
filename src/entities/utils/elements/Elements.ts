export function getHeightWithMargins(element: HTMLElement) {
    return element.offsetHeight
        + parseInt(element.style.marginTop)
        + parseInt(element.style.marginBottom);
}