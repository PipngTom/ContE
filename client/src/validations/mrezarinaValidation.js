import * as yup from 'yup';

const mrezarinaSchema = yup.object().shape({
    srednji_napon_vt: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    srednji_napon_reak: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    srednji_napon_odosnaga: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    srednji_napon_nt: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    srednji_napon_prereak: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    srednji_napon_prekosnaga: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    niski_napon_vt: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    niski_napon_reak: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    niski_napon_odosnaga: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    niski_napon_nt: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    niski_napon_prereak: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    niski_napon_prekosnaga: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    sp_dvotarifno_vt: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    sp_dvotarifno_nt: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    sp_dvotarifno_odosnaga: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    sp_domacinstvo_vt: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    sp_domacinstvo_nt: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    sp_domacinstvo_odosnaga: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    sp_jednotarifno_jt: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    sp_jednotarifno_odosnaga: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    jr_jt: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    pdv: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    akciza: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    naknada_tv: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    naknada_ee: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required(),
    naknada_oie: yup.number().typeError('Unesite brojčanu vrednost...').positive('Unesite pozitivnu vrednost...').required()
})

export { mrezarinaSchema }