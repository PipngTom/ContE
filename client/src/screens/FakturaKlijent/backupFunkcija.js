import { nadjiTabeluPoKategoriji, nadjiNazivVrsteSnabdevanja, nadjiNazivPoKategoriji } from "../../constants/brojila"
import { nadjiPocetakObracuna, nadjiKrajObracuna } from '../../constants/datum';
import { dajMeru, dajPunNaziv } from "../Fakture/pomocnaFunkcija";

export const backupFunkcija = (klijent, fMetering, ugovor, brojila, mrezarina, mesec, godina) => {
    let faktura = {}
    let zbirniRacun = {}
    let stavke = []

    zbirniRacun['idKlijenta'] = klijent.id
    zbirniRacun['orgDeo'] = klijent.nazivKlijenta
    zbirniRacun['pib'] = klijent.pib
    zbirniRacun['mesec'] = mesec
    zbirniRacun['godina'] = godina
    zbirniRacun['vrstaSnabdevanja'] = nadjiNazivVrsteSnabdevanja(brojila[0].vrstaSnabdevanja)
    zbirniRacun['periodObracuna'] = nadjiPocetakObracuna(mesec) + godina + '-' + nadjiKrajObracuna(mesec) + godina
    zbirniRacun['brojPojedinacnihObracuna'] = fMetering.length
    zbirniRacun['maticniBroj'] = klijent.maticniBroj
    zbirniRacun['klijent'] = klijent.nazivKlijenta
    zbirniRacun['adresa'] = klijent.adresaKlijenta
    zbirniRacun['kontaktMail'] = klijent.kontaktMail


        let sumE = 0
        let sumM = 0
        let sumN = 0
        stavke = fMetering.map((item,index) => {
                let sum1 = (item[0].vt ? (item[0].vt * ugovor.cenaVT) : 0) + (item[0].nt ? (item[0].nt * ugovor.cenaNT) : 0) + (item[0].jt ? (item[0].jt * ugovor.cenaJT) : 0)
                sumE = sumE + sum1

                let sum2 = 0
                Object.keys(item[0]).forEach((it, index) => {
                                
                    if (it != 'id' && 
                        it != 'idBrojilo' &&   
                        it != 'datumpoc' && 
                        it != 'datumkr' && 
                        it != 'maxsnaga' && 
                        it != 'godina' && 
                        it != 'mesec' &&
                        it != 'kategorija') {
                            

                            const prop = nadjiTabeluPoKategoriji(item[0].kategorija).replace('merenja_', '') + '_' + it
                            
                            sum2 = sum2 + item[0][it] *  (mrezarina[prop])
                        } 

                        if(index==Object.keys(item[0]).length-1) {
                            sumM = sumM + sum2
                        }
                    })

                let sum3 = 0
                let sumEn = ((item[0].vt ? item[0].vt : 0) + (item[0].nt ? item[0].nt : 0) + (item[0].jt ? item[0].jt : 0))
                sum3 = sumEn * (mrezarina.naknada_ee + mrezarina.naknada_oie)
                sumN = sumN + sum3

               return {
                   col1: index+1,
                   col2: brojila.find(el => el.id == item[0].idBrojilo).mestoMerenja,
                   col3: brojila.find(el => el.id == item[0].idBrojilo).adresaMerenja,
                   col4: sum1,
                   col5: sum2,
                   col6: sum3
               }
            }) 
        stavke.push({
            col1: '',
            col2: '',
            col3: 'Ukupno',
            col4: sumE,
            col5: sumM,
            col6: sumN
        })

        zbirniRacun['tabela1'] = stavke
        zbirniRacun['tabela2'] = [
            {
                col1:'Isporucena elektricna energija',
                col2: '1',
                col3: sumE
            },
            {
                col1:'Odobreni popust (Rabat %)',
                col2: '2=1*0',
                col3: 0.00
            },
            {
                col1: 'Pristup sistemu za prenos/distribuciju eletricne energije',
                col2: '3',
                col3: sumM
            },
            {
                col1: 'Naknada za podsticaj povlascenih proizvodjaca el. energije i unapredjenje EE',
                col2: '4',
                col3: sumN
            },
            {
                col1: 'Osnovica za obracun akcize',
                col2: '5=1+2+3+4',
                col3: sumE + sumM + sumN
            },
            {
                col1: 'Iznos obracunate akcize',
                col2: '6=5*0.075',
                col3: (sumE + sumM + sumN) * 0.075
            },
            {
                col1: 'Oslobodjen placanja akcize u skladu sa clanom 40lj stav 1 Zakona o akcizama',
                col2: '7',
                col3: 0.00
            },
            {
                col1: 'Osnovica za pdv',
                col2: '8=5+6+7',
                col3: (sumE + sumM + sumN) * 1.075
            },
            {
                col1: 'Porez na dodatu vrednost 20%',
                col2: '9=8*0.20',
                col3: (sumE + sumM + sumN) * 0.215
            },
            {
                col1: 'Taksa za javni medijski servis',
                col2: '10',
                col3: mrezarina.naknada_tv
            },
            {
                col1: 'Avans - osnovica',
                col2: '11',
                col3: 0.00
            },
            {
                col1: 'Avans - PDV',
                col2: '12=11*0.20',
                col3: 0.00
            },
            {
                col1: 'Ukupna osnovica',
                col2: '13=8-12',
                col3: (sumE + sumM + sumN) * 1.075
            },
            {
                col1: 'Ukupan PDV',
                col2: '14=9-12',
                col3: (sumE + sumM + sumN) * 0.215
            },
            {
                col1: 'Ukupno za uplatu',
                col2: '15=13+14+10',
                col3: ((sumE + sumM + sumN) * 1.29) + mrezarina.naknada_tv
            }
        ]
        faktura['zbirniRacun'] = zbirniRacun
        faktura['pojedinacniRacuni'] = []

        fMetering.forEach((item, index) => {
            let sum2 = 0;
            let sum1 = (item[0].vt ? (item[0].vt * ugovor.cenaVT) : 0) + (item[0].nt ? (item[0].nt * ugovor.cenaNT) : 0) + (item[0].jt ? (item[0].jt * ugovor.cenaJT) : 0)
            let sumEN = (item[0].vt ? item[0].vt : 0) + (item[0].nt ? item[0].nt : 0) + (item[0].jt ? item[0].jt : 0)
            let sum3 = sumEN * (mrezarina.naknada_ee + mrezarina.naknada_oie)

            const tabela1 = []


            if(item[0].vt) {
                    tabela1.push({
                    col1: 'Visa tarifa',
                    col2: 'kWh',
                    col3: item[0].vt,
                    col4: ugovor.cenaVT,
                    col5: ugovor.cenaVT * item[0].vt
                })
            }
            if(item[0].nt) {
                tabela1.push({
                    col1: 'Niza tarifa',
                    col2: 'kWh',
                    col3: item[0].nt,
                    col4: ugovor.cenaNT,
                    col5: ugovor.cenaNT * item[0].nt
                })
            }

            if(item[0].jt) {
                tabela1.push({
                    col1: 'Jedinstvena tarifa',
                    col2: 'kWh',
                    col3: item[0].jt,
                    col4: ugovor.cenaJT,
                    col5: ugovor.cenaJT * item[0].jt
                })
            }
            tabela1.push({
                col1: '',
                col2: '',
                col3: '',
                col4: 'Ukupno',
                col5: sum1
            })

            let tabela2 = []

            Object.keys(item[0]).forEach(it => {
                if (it != 'id' && 
                    it != 'idBrojilo' &&   
                    it != 'datumpoc' && 
                    it != 'datumkr' && 
                    it != 'maxsnaga' && 
                    it != 'godina' && 
                    it != 'mesec' &&
                    it != 'kategorija') {
                        const prop = nadjiTabeluPoKategoriji(item[0].kategorija).replace('merenja_', '') + '_' + it
                        sum2 = sum2 + item[0][it] *  mrezarina[prop]
                        tabela2.push({
                            col1: dajPunNaziv(it),
                            col2: dajMeru(it),
                            col3: item[0][it],
                            col4: mrezarina[prop],
                            col5: mrezarina[prop] * item[0][it]
                        })
                    }
            })
            tabela2.push({
                col1: '',
                col2: '',
                col3: '',
                col4: 'Ukupno',
                col5: sum2
            })

            const tabela3 = []

            tabela3.push({
                col1: 'Naknada za podsticaj povlascenih proizvodjaca el. energije',
                col2: 'kWh',
                col3: sumEN,
                col4: mrezarina.naknada_oie,
                col5: sumEN * mrezarina.naknada_oie
            }, {
                col1: 'Naknada za unapredjenje energetske efikasnosti',
                col2: 'kWh',
                col3: sumEN,
                col4: mrezarina.naknada_ee,
                col5: sumEN * mrezarina.naknada_ee
            }, {
                col1: '',
                col2: '',
                col3: '',
                col4: 'Ukupno',
                col5: sum3
            })


            const tabela4 = []

            tabela4.push({
                col1: 'Isporucena elektricna energija',
                col2: sum1
            }, {
                col1: 'Pristup sistemu za prenos/distribuciju elektricne energije',
                col2: sum2
            }, {
                col1: 'Naknada za podsticaj povlascenih proizvodjaca el. energije',
                col2: sumEN * mrezarina.naknada_oie
            }, {
                col1: 'Naknada za unapredjenje energetske efikasnosti',
                col2: sumEN * mrezarina.naknada_ee
            }, {
                col1: 'Osnova za obracun akcize',
                col2: sum1 + sum2 + sum3
            }, {
                col1: `Iznos obracunate akcize stopa ${mrezarina.akciza * 100}%`,
                col2: (sum1 + sum2 + sum3) * mrezarina.akciza
            }, {
                col1: 'Osnovica za PDV',
                col2: (sum1 + sum2 + sum3) * (mrezarina.akciza + 1)
            }, {
                col1: 'Porez na dodatu vrednost',
                col2: (sum1 + sum2 + sum3) * (mrezarina.akciza + 1) * mrezarina.pdv
            }, {
                col1: 'Taksa za javni medijski servis',
                col2: mrezarina.naknada_tv
            }, {
                col1: 'Ukupno za obracun',
                col2: (sum1 + sum2 + sum3) * (mrezarina.akciza + 1) * ((mrezarina.pdv + 1) + mrezarina.naknada_tv)
            })


            faktura['pojedinacniRacuni'].push(
            {
                orgDeo: klijent.nazivKlijenta, 
                kategorija: nadjiNazivPoKategoriji(item[0].kategorija),
                vrstaSnabdevanja: nadjiNazivVrsteSnabdevanja(brojila.find(br => br.id == item[0].idBrojilo).vrstaSnabdevanja),
                odSnaga: item[0].odosnaga,
                periodOb: `${item[0].datumpoc} - ${item[0].datumkr}`,
                mestoM: brojila.find(br => br.id == item[0].idBrojilo).mestoMerenja,
                adresaM: brojila.find(br => br.id == item[0].idBrojilo).adresaMerenja,
                pib: klijent.pib,
                maticniB: klijent.maticniBroj,
                klijent: klijent.nazivKlijenta,
                adresa: klijent.adresaKlijenta,
                kontMail: klijent.kontaktMail,
                tabela1: tabela1, 
                tabela2: tabela2,
                tabela3: tabela3,
                tabela4: tabela4
            })


        })

    //    faktura['pojedinacniRacuni'] = tabela1


        return faktura
    }
