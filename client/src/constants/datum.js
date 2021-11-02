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

export const nadjiPocetakObracuna = (mes) => {
    return mesec.find(item => item.sifraMes == mes).datumpoc
}

export const nadjiKrajObracuna = (mes) => {
    return mesec.find(item => item.sifraMes == mes).datumkr
}

export const transformDatum = (datum) => {
    console.log(datum)
    const godina = datum.substring(6,10)
    const mesec = datum.substring(3,5)
    const dan = datum.substring(0,2)
    const rezultat =  godina + '-' + mesec + '-' + dan
    console.log(rezultat)
    return rezultat;
}

export const nadjiNazivMeseca = (sifraMeseca) => {
    return mesec.find(item => item.sifraMes == sifraMeseca).naziv
}