import mocha from 'mocha';
const { describe, it } = mocha;
import chai from 'chai';
import chaiExclude from 'chai-exclude';
chai.use(chaiExclude);
const { expect } = chai;
import Person from './../src/person.js';

describe('Person', () => {
  it('shold return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      'Bike,Car 1400 2008-05-23 2010-03-16'
    );

    const expected = {
      vehicles: ['Bike', 'Car'],
      kmTraveled: '1400',
      from: '2008-05-23',
      to: '2010-03-16',
    };

    expect(person).excluding('id').to.be.deep.equal(expected);
  });

  it('shold format values', () => {
    const person = new Person({
      vehicles: ['Bike', 'Car'],
      kmTraveled: '1400',
      from: '2008-05-23',
      to: '2010-03-16',
    });
    const result = person.formatted('pt-BR');
    const expected = {
      vehicles: 'Bike e Car',
      kmTraveled: '1.400 km',
      from: '23 de maio de 2008',
      to: '16 de março de 2010',
    };

    expect(result).excluding('id').to.be.deep.equal(expected);
  });
});
