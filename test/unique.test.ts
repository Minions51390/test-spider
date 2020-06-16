import { unique } from '../util/tools';
test('unique()', () => {
    expect(unique(['1', '1', '1'])).toEqual(['1']);
});