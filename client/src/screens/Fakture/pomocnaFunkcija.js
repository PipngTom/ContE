const nazivi = [
    {
        skr: 'vt',
        punNaziv: 'Viša dnevna tarifa za aktivnu energiju',
        obracVelicine: 'kWh'
    },
    {
        skr: 'jt',
        punNaziv: 'Jedinstvena tarifa',
        obracVelicine: 'kWh'
    },
    {
        skr: 'nt',
        punNaziv: 'Niža dnevna tarifa za aktivnu energiju',
        obracVelicine: 'kWh'
    },
    {
        skr: 'reak',
        punNaziv: 'Reaktivna energija',
        obracVelicine: 'kVArh'
    },
    {
        skr: 'prereak',
        punNaziv: 'Prekomerna reaktivna energija',
        obracVelicine: 'kVArh'
    },
    {
        skr: 'odosnaga',
        punNaziv: 'Odobrena snaga',
        obracVelicine: 'kW'
    },
    {
        skr: 'prekosnaga',
        punNaziv: 'Prekomerna snaga',
        obracVelicine: 'kW'
    }
]

export const dajPunNaziv = (skr) => {
   // console.log(skr)
    return nazivi.find(item => item.skr == skr).punNaziv
}

export const dajMeru = (mera) => {
    return nazivi.find(item => item.skr == mera).obracVelicine
}