/**
 * @file: tools.test.ts
 * @description 测试工具方法
 */
import { unique, diff } from '../src/util/tools';

describe('unique() test', () => {
    test('base data test', () => {
        expect(unique(['1', '1', '1'])).toEqual(['1']);
    });
});

describe('diff() test', () => {
    test('base data test', () => {
        const mainArr = ['m1', 'm2'];
        const diffArr = ['m1', 'm3'];
        const finArr = diff(mainArr, diffArr);
        expect(finArr).toEqual(['m2']);
    });
});