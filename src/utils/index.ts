/**
 * Merge Tailwind CSS classes
 *
 * @param {string[]} classes Tailwind CSS classes
 */
export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
