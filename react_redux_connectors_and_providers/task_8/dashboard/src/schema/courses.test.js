import { coursesNormalizer } from './courses';

describe('coursesNormalizer', () => {
  it('normalizes a list of courses by id', () => {
    const data = [
      { id: '1', name: 'ES6', credit: 60 },
      { id: '2', name: 'Webpack', credit: 20 },
    ];

    expect(coursesNormalizer(data)).toEqual({
      entities: {
        courses: {
          1: { id: '1', name: 'ES6', credit: 60 },
          2: { id: '2', name: 'Webpack', credit: 20 },
        },
      },
      result: ['1', '2'],
    });
  });

  it('returns no entities for an empty list', () => {
    expect(coursesNormalizer([])).toEqual({ entities: {}, result: [] });
  });
});
