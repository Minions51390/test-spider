import { writeFile, readFileSync, existsSync, appendFile } from 'fs';
import { resolve } from 'path';

interface LogStat {
    logFilePath: string
    errMsg: string
}

export function unique(arr: string[]): string[] {
    return arr.length > 0 ? Array.from(new Set(arr)) : [];
}

export const diff = (mainArr: string[], diffArr: string[]): string[] => {
    var newArr = [];
    newArr = mainArr.filter(function (value: string) {
        return diffArr.indexOf(value) === -1;
    });
    return newArr;
}

export function logFn(stat: LogStat) {
    if (existsSync(stat.logFilePath)) {
        appendFile(stat.logFilePath, stat.errMsg, function (err) {
            err && console.log(err);
        });
    } else {
        writeFile(stat.logFilePath, stat.errMsg, function (err) {
            err && console.log(err);
        });
    }
}