import { resolve } from 'path';

interface StaticConfInf {
    outputFile: string
    allIdFile: string
    readLogFile: string
    writeLogFile: string
    fetchLogFile: string
}
export const spiderUrl: string = 'http://localhost:3000';
export const staticConf: StaticConfInf = {
    outputFile: resolve(__dirname, '../data/output.data'),
    allIdFile: resolve(__dirname, '../data/allId.data'),
    readLogFile: resolve(__dirname, '../log/readErrLog.data'),
    writeLogFile: resolve(__dirname, '../log/writeErrLog.data'),
    fetchLogFile: resolve(__dirname, '../log/fetchLogFile.data')
}