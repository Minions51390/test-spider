/**
 * @file: staticConf.ts
 * @description 定义常量
 */
import { resolve } from 'path';
import { StaticConfInf } from '../interface/staticConf';

/**
 * 接口地址
 *
 * @const
 * @type {string}
 */
export const spiderUrl: string = 'http://localhost:3000/addM';

/**
 * 文件目录
 *
 * @typedef {Object} staticConf
 * @property {string} outputFile 新数据输出文件
 * @property {string} allIdFile 已有数据文件
 * @property {string} errLogFile 系统报错文件
 * @property {string} fetchLogFile 请求报错文件
 */
export const staticConf: StaticConfInf = {
    outputFile: resolve(__dirname, '../../data/existence.data'),
    allIdFile: resolve(__dirname, '../../data/allid.data'),
    errLogFile: resolve(__dirname, '../../log/err-log.data'),
    fetchLogFile: resolve(__dirname, '../../log/fetch-log-file.data')
}