const kategorija = [
    {
        tabela: 'merenja_srednji_napon',
        obracun: 'dvotarifno_merenje',
        kategorija: 'privreda_preko_1kv',
        sifra: 1,
        naziv: 'Potrosnja na srednjem naponu',
        stavke: [
            {kolona: 'vt', naziv: 'Visa tarifa'},
            {kolona: 'nt', naziv: 'Niza tarifa'},
            {kolona: 'reak', naziv: 'Reaktivna energija'},
            {kolona: 'prereak', naziv: 'Prekomerna reaktivna energija'},
            {kolona: 'odosnaga', naziv: 'Odobrena snaga'},
            {kolona: 'prekosnaga', naziv: 'Prekomerna snaga'},
            {kolona: 'maxsnaga', naziv: 'Maksimalna snaga'}
        ]
    },
    {
        tabela: 'merenja_niski_napon',
        obracun: 'dvotarifno_merenje',
        kategorija: 'privreda_do_1kv_sa_merenjem_snage',
        sifra: 2,
        naziv: 'Potrosnja na niskom naponu',
        stavke: [
            {kolona: 'vt', naziv: 'Visa tarifa'},
            {kolona: 'nt', naziv: 'Niza tarifa'},
            {kolona: 'reak', naziv: 'Reaktivna energija'},
            {kolona: 'prereak', naziv: 'Prekomerna reaktivna energija'},
            {kolona: 'odosnaga', naziv: 'Odobrena snaga'},
            {kolona: 'prekosnaga', naziv: 'Prekomerna snaga'},
            {kolona: 'maxsnaga', naziv: 'Maksimalna snaga'}
        ]
    },
    {
        tabela: 'merenja_sp_dvotarifno',
        obracun: 'dvotarifno_merenje',
        kategorija: 'privreda_do_1kv_bez_merenja_snage',
        sifra: 3,
        naziv: 'Siroka potrosnja - dvotarifno brojilo',
        stavke: [
            {kolona: 'vt', naziv: 'Visa tarifa'},
            {kolona: 'nt', naziv: 'Niza tarifa'},
            {kolona: 'odosnaga', naziv: 'Odobrena snaga'}
        ]
    },
    {
        tabela: 'merenja_sp_jednotarifno',
        obracun: 'jednotarifno_merenje',
        kategorija: 'privreda_do_1kv_bez_merenja_snage',
        sifra: 4,
        naziv: 'Siroka potrosnja - jednotarifno brojilo',
        stavke: [{kolona: 'jt', naziv: 'Jedinstvena tarifa'},
                {kolona: 'odosnaga', naziv: 'Odobrena snaga'}
    ]
    },
    {
        tabela: 'merenja_jr',
        kategorija: 'javna_rasveta',
        sifra: 5,
        naziv: 'Javno osvetljenje',
        stavke: [{kolona: 'jt', naziv: 'Jedinstvena tarifa'}
                ]
    },
    {
        tabela: 'merenja_sp_domacinstvo',
        obracun: 'dvotarifno_merenje',
        kategorija: 'domacinstvo',
        sifra: 6,
        naziv: 'Siroka potrosnja - domacinstvo',
        stavke: [
            {kolona: 'vt', naziv: 'Visa tarifa'},
            {kolona: 'nt', naziv: 'Niza tarifa'},
            {kolona: 'odosnaga', naziv: 'Odobrena snaga'}
        ]
    }

]

const vrsteSnabdevanja = [
    {
        sifra: 1,
        naziv: 'komercijalno snabdevanje'
    },
    {
        sifra: 2,
        naziv: 'rezervno snabdevanje'
    },
    {
        sifra: 3,
        naziv: 'garantovano snabdevanje'
    }
    
]

export const celaKategorija = () => {
    return kategorija.map(item => {
       return {
        sifra: item.sifra,
        naziv: item.naziv
        }
})
}

export const nadjiTabeluPoKategoriji = (sifra) => {
    return kategorija.find(item => item.sifra == sifra).tabela
}

export const nadjiCitavuTabelu = (kat) => {
    return kategorija.find(item => item.sifra == kat)
}

export const nadjiNazivPoKategoriji = (kat) => {
    return kategorija.find(item => item.sifra == kat).naziv
}

export const nadjiStavkePoSifri = (sifra) => {
    return kategorija.find(item => item.sifra == sifra).stavke
}

export const celaVrstaSnabdevanja = () => {
    return vrsteSnabdevanja.map(item => {
        return {
            sifra: item.sifra,
            naziv: item.naziv
        }
    })
}

export const nadjiNazivVrsteSnabdevanja = (vrsta) => {
   // console.log('unutar funkcije: ',vrsta)
    return vrsteSnabdevanja.find(item => item.sifra == vrsta).naziv
}
