import * as yup from 'yup';

const clientSchema = yup.object().shape({
    nazivKlijenta: yup.string().required('Ovo polje je obavezno !'),
    kontaktMail: yup.string().email().required('Ovo polje je obavezno !'),
    pib: yup.string().min(9, 'Unesite minimum 9 brojeva...').max(9, 'Unesite maksimum 9 brojeva...').required(),
    nazivBanke: yup.string().required('Ovo polje je obavezno !'),
    racunBanka: yup.string().min(18, 'Unesite minimum 18 brojeva...').max(22, 'Unesite maksimum 18 brojeva...').required()
})

export { clientSchema }