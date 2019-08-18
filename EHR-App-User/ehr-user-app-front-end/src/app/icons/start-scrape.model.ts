export class Patient {
    patientName: string;
    homePhone: string;
    address: string;
    officePhone: string;
    fax: string;
    birthDate: any;
    status: string;
    gender: string;
    maritalStatus: string;
    contactBy: string;
    race: string;
    socSecNo: string;
    language: string;
    respProv: string;
    mrn: string;
    referredBy: string;
    empStatus: string;
    email: string;
    sensChart: string;
    homeLOC: string;
    externalID: string;

    problems: any;
    medications: any;

    patientHistory: any;

    physicalExam: any;

    hospitalName: string;
    hospitalFax: string;
    hospitalPhone: string;
    hash: string;

    general: string;
    eyesEarOrNoseOrThroat: string;
    cardiovascular: string;
    gastrointestinalGenitourinary: string;
    musculoskeletal: string;
    skin: string;
    neurologic: string;
    psychiatric: string;
    endocrine: string;
    hemeOrLymphatic: string;
    lymphaticAllergicOrImmunologic: string;

    ht: string;
    wt: number;
    rhythm: string;
    bP: string;

    constructor(patient) {
        this.patientName = patient.patientName || '';
        this.homePhone = patient.homePhone || '';
        this.address = patient.address || '';
        this.officePhone = patient.officePhone || '';
        this.fax = patient.fax || '';
        this.birthDate = patient.birthDate || '';
        this.status = patient.status || '';
        this.gender = patient.gender || '';
        this.maritalStatus = patient.maritalStatus || '';
        this.contactBy = patient.contactBy || '';
        this.race = patient.race || '';
        this.socSecNo = patient.socSecNo || '';
        this.language = patient.language || '';
        this.respProv = patient.respProv || '';
        this.mrn = patient.mrn || '';
        this.referredBy = patient.referredBy || '';
        this.empStatus = patient.empStatus || '';
        this.email = patient.email || '';
        this.sensChart = patient.sensChart || '';
        this.homeLOC = patient.homeLOC || '';
        this.externalID = patient.externalID || '';
        this.problems = patient.problems || '';
        this.medications = patient.medications || '';
        this.patientHistory = patient.patientHistory || '';
        this.physicalExam = patient.physicalExam || '';
        this.hospitalName = patient.hospitalName || '';
        this.hospitalFax = patient.hospitalFax || '';
        this.hospitalPhone = patient.hospitalPhone || '';
        this.hash = patient.hash || '';

        this.general = patient.general || '';
        this.eyesEarOrNoseOrThroat = patient.eyesEarOrNoseOrThroat || '';
        this.cardiovascular = patient.cardiovascular || '';
        this.gastrointestinalGenitourinary = patient.gastrointestinalGenitourinary || '';
        this.musculoskeletal = patient.musculoskeletal || '';
        this.skin = patient.skin || '';
        this.neurologic = patient.neurologic || '';
        this.psychiatric = patient.psychiatric || '';
        this.endocrine = patient.endocrine || '';
        this.hemeOrLymphatic = patient.hemeOrLymphatic || '';
        this.lymphaticAllergicOrImmunologic = patient.lymphaticAllergicOrImmunologic || '';

        this.ht = patient.ht || '';
        this.wt = patient.wt || '';
        this.rhythm = patient.rhythm || '';
        this.bP = patient.bP || '';
    }
}