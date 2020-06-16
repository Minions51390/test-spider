import { writeFile, readFileSync } from 'fs';
import { resolve } from 'path';
import { fetchData } from "./fetch-data";
import { unique, diff, logFn } from "../util/tools";
import { staticConf, spiderUrl } from "../config/staticConf";
interface ProcessOptions { }

interface PidInf {
    idList: string[]
}

export const init = async (options?: ProcessOptions) => {
    const { outputFile, allIdFile, readLogFile, writeLogFile } = staticConf;
    const reg: RegExp = /m[0-9]+/g;
    let htmlContent: string = await fetchData(spiderUrl);
    let pidList: PidInf = {
        idList: unique(htmlContent.match(reg) || [])
    };
    let oldIdList: PidInf = {
        idList: []
    }
    try {
        oldIdList = JSON.parse(readFileSync(allIdFile, 'utf8'));
    } catch (e) {
        logFn({
            logFilePath: readLogFile,
            errMsg: `---ERROR---: errWay: read; readfailFile: ${allIdFile}; errMsg${e.toString()} \r\n`
        });
        writeFile(allIdFile, '', function (err) {
            err && logFn({
                logFilePath: writeLogFile,
                errMsg: `---ERROR---: errWay: write; writefailFile: ${allIdFile}; errMsg${err.toString()} \r\n`
            });
        });
    }
    let newIdList: PidInf = {
        idList: unique([...pidList.idList, ...oldIdList.idList])
    }
    if (newIdList.idList.length > oldIdList.idList.length) {
        console.log("发现了新增内容！");
        writeFile(outputFile, diff(newIdList.idList, oldIdList.idList).join(' '), function (err) {
            err && logFn({
                logFilePath: writeLogFile,
                errMsg: `---ERROR---: errWay: write; writefailFile: ${outputFile}; errMsg${err.toString()} \r\n`
            });
        });
        writeFile(allIdFile, JSON.stringify(newIdList), function (err) {
            err && logFn({
                logFilePath: writeLogFile,
                errMsg: `---ERROR---: errWay: write; writefailFile: ${allIdFile}; errMsg${err.toString()} \r\n`
            });
        });
    } else {
        console.log("未能找到新增内容！");
    }
}