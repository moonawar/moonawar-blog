export function toTagLink (tag : string) : string {
    return tag.toLowerCase().replace(' ', '-');
}

export function getURLByPostTag(tag : string) : string {
    return `/posts/${toTagLink(tag)}/1`
}

export function toTitle(str: string) : string {
    return str.replace(
        /\w\S*/g,
        function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
        }
    ).replaceAll('-', ' ');
}

interface Link {
   href: string;
   title: string;
}

type Links = Link[];

export function extractPathNameToLinks(pathName : string) : Links {
    const segments : string[] = pathName.split('/');
    segments.shift(); // we don't want the element before the first '/'
    const links : Link[] = [];
    
    segments.reduce((current, segment) => {
        const href = `${current}/${segment}`
        const title = toTitle(segment);

        const link : Link = {
            href: href,
            title: title,
        }
        
        links.push(link);
        return href;
    }, ''); 

    return [{href:'/', title:'Home'}, ...links];
} 