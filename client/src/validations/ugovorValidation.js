import * as yup from 'yup';

export const ugovorSchema = yup.object().shape({
    cenaVT: yup.number().typeError('mora biti broj').positive('moras ukucati poz'),
    cenaNT: yup.number().typeError('mora biti broj').positive('moras ukucati poz'),
    cenaJT: yup.number().typeError('mora biti broj').positive('moras ukucati poz')
})