export const processUserData = (data: string): { name: string; chatID: string }[] | undefined => {
    try {
        const array: { name: string; chatID: string }[] = [];

        const newData = JSON.parse(data);
        Object.keys(newData).forEach(key => {
            const name = newData[key].firstName;
            array.push({ name: name, chatID: key });
        });
        return array;
    } catch (err) {
        console.error(`Error processUserData: ${JSON.stringify(err)}`);
    }
};

export const deepCopy = <T>(obj: T): T | undefined => {
    try {
        return JSON.parse(JSON.stringify(obj));
    } catch (err) {
        console.error(`Error deepCopy: ${JSON.stringify(err)}`);
    }
};

export const isChecked = (value: string | boolean): boolean => ['true', true].includes(value);

export const deleteDoubleEntriesInArray = <T>(arr: T[]): T[] =>
    arr.filter((item, index) => arr.indexOf(item) === index);

export const sortArray = (arr: string[]): string[] => {
    arr.sort((a, b) => {
        const lowerCaseA = a.toLowerCase();
        const lowerCaseB = b.toLowerCase();

        if (lowerCaseA < lowerCaseB) {
            return -1;
        }
        if (lowerCaseA > lowerCaseB) {
            return 1;
        }
        return 0;
    });
    return arr;
};

export const checkObjectOrArray = (obj: object): string => {
    if (typeof obj == 'object' && Array.isArray(obj)) {
        return 'array';
    }
    if (typeof obj == 'object') {
        return 'object';
    }
    return typeof obj;
};

export function scrollToId(id: string): void {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
