/**
 * @file: init.test.ts
 * @description 测试爬取方法
 */
import fs from 'fs';
import { init } from '../src/init';
import { StaticConfInf } from '../src/interface/staticConf';

describe('init() test', () => {
    const filesPath: StaticConfInf = {
        outputFile: './data/existence.data',
        allIdFile: './data/allid.data',
        errLogFile: './log/err-log.data',
        fetchLogFile: './log/fetch-log-file.data'
    };
    fs.writeFileSync(filesPath.allIdFile, JSON.stringify({idList:["m94316593949"]}));

    test('right flow path', () => {
        const url: string = 'http://localhost:3000/addM';
        init(filesPath, url);
        const newData = !!fs.readFileSync(filesPath.outputFile, 'utf8');
        expect(newData).toEqual(true);
    });

    test('fetch flow path error', () => {
        const url: string = 'http://localhost:300/addM';
        init(filesPath, url);
        const newData = !!fs.readFileSync(filesPath.fetchLogFile, 'utf8');
        expect(newData).toEqual(true);
    });

    test('main code flow path error', () => {
        fs.writeFileSync(filesPath.allIdFile, 'lalala');
        const url: string = 'http://localhost:3000/addM';
        init(filesPath, url);
        const newData = !!fs.readFileSync(filesPath.errLogFile, 'utf8');
        expect(newData).toEqual(true);
    });
});