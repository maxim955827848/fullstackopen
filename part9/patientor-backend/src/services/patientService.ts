import patientsData from '../data/patients.json';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { randomUUID } from 'crypto';

const patients: Patient[] = patientsData as Patient[];

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: randomUUID(),
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getNonSensitiveEntries, addPatient };
