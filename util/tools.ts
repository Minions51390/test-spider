import { writeFile, readFileSync, existsSync, appendFile } from 'fs';
import { resolve } from 'path';
// 日志规范
interface LogStat {
    logFilePath: string
    errMsg: string
}
// 数组去重
export const unique = (arr: string[]): string[] => {
    return arr.length > 0 ? Array.from(new Set(arr)) : [];
}
// 比较数组之间的差异
export const diff = (mainArr: string[], diffArr: string[]): string[] => {
    var newArr = [];
    newArr = mainArr.filter(function (value: string) {
        return diffArr.indexOf(value) === -1;
    });
    return newArr;
}
// 写入报错日志
export const logFn = (stat: LogStat) => {
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