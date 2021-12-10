import * as yup from 'yup';

const nametiSchema = yup.object().shape({
    pdv: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    akciza: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    naknada_tv: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    naknada_ee: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    naknada_oie: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required()
})

export { nametiSchema }