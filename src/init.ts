import { writeFile, readFileSync, statSync } from 'fs';
import { resolve } from 'path';
import { fetchData } from "./fetch-data";
import { unique, diff, logFn } from "../util/tools";
interface ProcessOptions { }

interface PidInf {
    idList: string[]
}

export async function init(options?: ProcessOptions) {
    const outputFile: string = resolve(__dirname, '../data/output.data');
    const allIdFile: string = resolve(__dirname, '../data/allId.data');
    const readLogFile: string = resolve(__dirname, '../log/readErrLog.data');
    const writeLogFile: string = resolve(__dirname, '../log/writeErrLog.data');
    const reg: RegExp = /m[0-9]+/g;
    let htmlContent: string = await fetchData();
    let pidList: PidInf = {
        idList: unique(htmlContent.match(reg))
    };
    let oldIdList: PidInf = {
        idList: []
    }
    try {
        oldIdList = JSON.parse(readFileSync(allIdFile, 'utf8'));
    } catch (e) {
        logFn({
            logFilePath: readLogFile,
            errMsg: `---ERROR---: errWay: read; readfailFile: ${allIdFile}; errMsg${e.toString()}`
        });
        writeFile(allIdFile, '', function (err) {
            err && logFn({
                logFilePath: writeLogFile,
                errMsg: `---ERROR---: errWay: write; writefailFile: ${allIdFile}; errMsg${err.toString()}`
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
                errMsg: `---ERROR---: errWay: write; writefailFile: ${outputFile}; errMsg${err.toString()}`
            });
        });
        writeFile(allIdFile, JSON.stringify(newIdList), function (err) {
            err && logFn({
                logFilePath: writeLogFile,
                errMsg: `---ERROR---: errWay: write; writefailFile: ${allIdFile}; errMsg${err.toString()}`
            });
        });
    } else {
        console.log("未能找到新增内容！");
    }
}