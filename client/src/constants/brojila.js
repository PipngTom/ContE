export const kategorija = [
    {
        tabela: 'merenja_srednji_napon',
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
        sifra: 4,
        naziv: 'Siroka potrosnja - jednotarifno brojilo',
        stavke: [{kolona: 'jt', naziv: 'Jedinstvena tarifa'},
                {kolona: 'odosnaga', naziv: 'Odobrena snaga'}
    ]
    },
    {
        tabela: 'merenja_jr',
        sifra: 5,
        naziv: 'Javno osvetljenje',
        stavke: [{kolona: 'jt', naziv: 'Jedinstvena tarifa'}
                ]
    },
    {
        tabela: 'merenja_sp_domacinstvo',
        sifra: 6,
        naziv: 'Siroka potrosnja - domacinstvo',
        stavke: [
            {kolona: 'vt', naziv: 'Visa tarifa'},
            {kolona: 'nt', naziv: 'Niza tarifa'},
            {kolona: 'odosnaga', naziv: 'Odobrena snaga'}
        ]
    }

]

export const vrsteSnabdevanja = [
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