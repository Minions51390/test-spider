/**
 * @file: staticConf.ts
 * @description 定义接口
 */

/**
 * 文件目录
 *
 * @typedef {Object} StaticConfInf
 * @property {string} outputFile 新数据输出文件
 * @property {string} allIdFile 已有数据文件
 * @property {string} errLogFile 系统报错文件
 * @property {string} fetchLogFile 请求报错文件
 */
export interface StaticConfInf {
    outputFile: string
    allIdFile: string
    errLogFile: string
    fetchLogFile: string
}

/**
 * 文件目录
 *
 * @typedef {Object} LogStat
 * @property {string} logFilePath 输出文件夹路径
 * @property {string} errMsg 错误信息
 */
export interface LogStat {
    logFilePath: string
    errMsg: string
}