import * as yup from 'yup';

const ugovorSchema = yup.object().shape({
    cenaVT: yup.number().typeError('Unesite brojcanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    cenaNT: yup.number().typeError('Unesite brojcanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    cenaJT: yup.number().typeError('Unesite brojcanu vrednost...').positive('Unesite pozitivnu vrednost...').required()
  });

export { ugovorSchema }