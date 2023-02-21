export const getInitials = (name?: string) => {
    if (!name) {
        return '';
    }
    let initials: any = name?.match(/\b\w/g) || [];
    initials = (
        (initials.shift() || '') + (initials.pop() || '')
    ).toUpperCase();
    return initials;
};

export const getFirstName = (name?: string) => {
    if (!name) {
        return '';
    }
    return name.split(' ')[0];
};

export const getIdFromYoutubeURL = (url: string) => {
    const regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
};

export const cleanVimeoURL = (url: string) => {
    const httpsLink = 'https://vimeo.com/';
    const httpLink = 'http://vimeo.com/';
    const playerLink = 'https://player.vimeo.com/video/';

    return url.replace(httpsLink, playerLink).replace(httpLink, playerLink);
};

export const getIdFromVimeoUrl = (url: string) => url?.match(/\d+/)![0];

export const urlify = (text: string) => text.split(/(https?:\/\/[^\s]+)/g);

export const getRouteNameFromType = (type: string) => {
    let url = type
        ?.replace(/(^|-)(\w)/g, c => c.toUpperCase())
        .replace(/-/g, '');

    if (url === 'Workout') {
        url = 'Workout';
    } else if (url === 'Program') {
        url = 'Program';
    } else if (url === 'Course') {
        url = 'Course';
    } else if (url === 'Gamebrain' || url === 'Classroom') {
        url = 'Learning';
    } else if (type === 'team') {
        url = 'CrossTraining';
    }

    return url;
};

export const parseTeaserPath = (path: string) => {
    const [type, id] = path.split('/');
    return {type: type.replace(/s$/, ''), id};
};

export const parseVideoPath = (path: string) => {
    const segments = path.split('/');
    const [collection, key] = segments.slice(segments.length - 2);
    const type = collection.endsWith('s')
        ? collection.slice(0, -1)
        : collection;

    return {type, key};
};

export const getPathFromNavState = ({routes, index}) => {
    const currentRoute = routes[index];

    if (currentRoute.state) {
        return [currentRoute.name, ...getPathFromNavState(currentRoute.state)];
    }
    return [currentRoute.name];
};
