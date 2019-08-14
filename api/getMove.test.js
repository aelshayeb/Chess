const chai = require('chai');
const expect = chai.expect;
const url = 'http://localhost:8000';
const request = require('supertest')(url);

describe('Movement Api:', () => {
  it('should return 400 error when position is lowercase', done => {
    request
      .post('/api/movement')
      .send({ pos: 'a1' })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return 400 error when position is not between A and H', done => {
    request
      .post('/api/movement')
      .send({ pos: 'Z1' })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return 400 error when position is null', done => {
    request
      .post('/api/movement')
      .send({ pos: '' })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return 400 error when position is not between 1 and 8', done => {
    request
      .post('/api/movement')
      .send({ pos: 'a0' })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return valid positions', done => {
    request
      .post('/api/movement')
      .send({ pos: 'A4' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.deep.equal({
          first: ['B6', 'B2', 'C5', 'C3'],
          second: [
            'C8',
            'C4',
            'A8',
            'D7',
            'D5',
            'D3',
            'D1',
            'B7',
            'B3',
            'E6',
            'E4',
            'A6',
            'B5',
            'B1',
            'E2',
            'A2',
          ],
        });
        done();
      });
  });
});
