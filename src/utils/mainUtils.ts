export function toTagLink (tag : string) : string {
    return tag.toLowerCase().replace(' ', '-');
}

export function getURLByPostTag(tag : string) : string {
    return `/posts/${toTagLink(tag)}/1`
}