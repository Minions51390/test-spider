/**
 * @file: init.ts
 * @description 初始化
 */
import { writeFileSync, readFileSync } from 'fs';
import { fetchData } from "./fetch-data";
import { unique, diff, logFn } from "./util/tools";
import { StaticConfInf } from './interface/staticConf';

/**
 * 初始化
 * @param options 配置文件
 */
export const init = async (filesPath?: StaticConfInf, url?: string) => {
    const { outputFile, allIdFile, errLogFile } = filesPath;
    const reg: RegExp = /m[0-9]+/g;
    const htmlContent = await fetchData(url);
    try {
        const oldIdList = JSON.parse(readFileSync(allIdFile, 'utf8'));
        const newIdList = {
            idList: unique(
                [
                    ...unique(htmlContent.match(reg) || []),
                    ...oldIdList.idList
                ]
            )
        }
        if (newIdList.idList.length > oldIdList.idList.length) {
            console.log("发现了新增内容！");
            writeFileSync(outputFile, diff(newIdList.idList, oldIdList.idList).join(' '));
            writeFileSync(allIdFile, JSON.stringify(newIdList));
            return;
        }
        console.log("未能找到新增内容！");
    }
    catch(err) {
        logFn({
            logFilePath: errLogFile,
            errMsg: `---ERROR---: errWay: ERROR; errMsg${err.toString()} \r\n`
        });
    }
}