/**
 * @file: tools.ts
 * @description 工具函数
 */
import { writeFileSync, existsSync, appendFileSync } from 'fs';
import { LogStat } from '../interface/staticConf';

/**
 * 数组去重
 * @param arr 被去重数组
 */
export const unique = (arr: string[]): string[] => {
    return arr.length > 0 ? Array.from(new Set(arr)) : [];
}

/**
 * 比较数组的差异
 * @param mainArr 规范数组
 * @param diffArr 差异数组
 */
export const diff = (mainArr: string[], diffArr: string[]): string[] => {
    let newArr = [];
    newArr = mainArr.filter((value: string) => {
        return diffArr.indexOf(value) === -1;
    });
    return newArr;
}

/**
 * 写入错误信息
 * @param stat 错误信息
 */
export const logFn = (stat: LogStat) => {
    if (existsSync(stat.logFilePath)) {
        appendFileSync(stat.logFilePath, stat.errMsg);
    } else {
        writeFileSync(stat.logFilePath, stat.errMsg);
    }
}