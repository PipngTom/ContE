const mesec = [
    {
        sifraMes: '0',
        naziv: 'januar',
        datumpoc: '02.01.',
        datumkr: '01.02.'
    },
    {
        sifraMes: '1',
        naziv: 'februar',
        datumpoc: '02.02.',
        datumkr: '01.03.'
    },
    {
        sifraMes: '2',
        naziv: 'mart',
        datumpoc: '02.03.',
        datumkr: '01.04.'
    },
    {
        sifraMes: '3',
        naziv: 'april',
        datumpoc: '02.04.',
        datumkr: '01.05.'
    },
    {
        sifraMes: '4',
        naziv: 'maj',
        datumpoc: '02.05.',
        datumkr: '01.06.'
    },
    {
        sifraMes: '5',
        naziv: 'jun',
        datumpoc: '02.06.',
        datumkr: '01.07.'
    },
    {
        sifraMes: '6',
        naziv: 'jul',
        datumpoc: '02.07.',
        datumkr: '01.08.'
    },
    {
        sifraMes: '7',
        naziv: 'avgust',
        datumpoc: '02.08.',
        datumkr: '01.09.'
    },
    {
        sifraMes: '8',
        naziv: 'septembar',
        datumpoc: '02.09.',
        datumkr: '01.10.'
    },
    {
        sifraMes: '9',
        naziv: 'oktobar',
        datumpoc: '02.10.',
        datumkr: '1.11.'
    },
    {
        sifraMes: '10',
        naziv: 'novembar',
        datumpoc: '02.11.',
        datumkr: '01.12.'
    },
    {
        sifraMes: '11',
        naziv: 'decembar',
        datumpoc: '02.12.',
        datumkr: '01.01.'
    }
]

const validnostUgovora = [
    {
        sifra: '0',
        datum: '15.01.',
        naziv: 'januar'
    },
    {
        sifra: '1',
        datum: '15.02.',
        naziv: 'februar'
    },
    {
        sifra: '2',
        datum: '15.03.',
        naziv: 'mart'
    },
    {
        sifra: '3',
        datum: '15.04',
        naziv: 'april'
    },
    {
        sifra: '4',
        datum: '15.05.',
        naziv: 'maj'
    },
    {
        sifra: '5',
        datum: '15.06.',
        naziv: 'jun'
    },
    {
        sifra: '6',
        datum: '15.07.',
        naziv: 'jul'
    },
    {
        sifra: '7',
        datum: '15.08.',
        naziv: 'avgust'
    },
    {
        sifra: '8',
        datum: '15.09.',
        naziv: 'septembar'
    },
    {
        sifra: '9',
        datum: '15.10.',
        naziv: 'oktobar'
    },
    {
        sifra: '10',
        datum: '15.11.',
        naziv: 'novembar'
    },
    {
        sifra: '11',
        datum: '15.12.',
        naziv: 'decembar'
    }
]

export const nadjiPocetakObracuna = (mes) => {
    return mesec.find(item => item.sifraMes == mes).datumpoc
}

export const nadjiKrajObracuna = (mes) => {
    return mesec.find(item => item.sifraMes == mes).datumkr
}

export const transformDatum = (datum) => {
    const godina = datum.substring(6,10)
    const mesec = datum.substring(3,5)
    const dan = datum.substring(0,2)
    const rezultat =  godina + '-' + mesec + '-' + dan
    return rezultat;
}

export const nadjiNazivMeseca = (sifraMeseca) => {
    return mesec.find(item => item.sifraMes == sifraMeseca).naziv
}

export const nadjiVazeciUgovor = (sifra) => {
    return validnostUgovora.find(item => item.sifra == sifra).datum
}

export const kreirajDatum = (datum) => {
    const pom = datum.split('-')
    const godina = pom[2]
    const mesec = pom[1]
    const dan = pom[0]
    return new Date(godina, Number(mesec) - 1, dan)
}