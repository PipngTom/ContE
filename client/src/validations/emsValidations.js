import * as yup from 'yup';

const emsSchema = yup.object().shape({
    h1:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h2:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h3:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h4:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h5:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h6:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h7:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h8:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h9:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h10:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h11:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h12:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h13:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h14:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h15:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h16:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h17:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h18:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h19:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h20:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h21:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h22:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h23:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    h24:  yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required()
})

export { emsSchema }