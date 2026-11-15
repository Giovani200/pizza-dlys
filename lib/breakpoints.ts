/** Same breakpoint as the CSS modules' `@media (min-width: 75rem)`, for `sizes` attributes. */
const DESKTOP_MEDIA = "(min-width: 75rem)";

export const responsiveSizes = (mobile: string, desktop: string) => `${DESKTOP_MEDIA} ${desktop}, ${mobile}`;
