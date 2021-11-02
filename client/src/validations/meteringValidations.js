import * as yup from 'yup';

const meteringSchema1 = yup.object().shape({
    vt: yup.number().typeError('Unesite brojčanu vrednost...').moreThan(-0.00001, 'Unesite pozitivnu vrednost...').required(),
    nt: yup.number().typeError('Unesite brojčanu vrednost...').moreThan(-0.00001, 'Unesite pozitivnu vrednost...').required(),
    reak: yup.number().typeError('Unesite brojčanu vrednost...').moreThan(-0.00001, 'Unesite pozitivnu vrednost...').required(),
    prereak: yup.number().typeError('Unesite brojčanu vrednost...').moreThan(-0.00001, 'Unesite pozitivnu vrednost...').required(),
    odosnaga: yup.number().typeError('Unesite brojčanu vrednost...').moreThan(-0.00001, 'Unesite pozitivnu vrednost...').required(),
    prekosnaga: yup.number().typeError('Unesite brojčanu vrednost...').moreThan(-0.00001, 'Unesite pozitivnu vrednost...').required(),
    maxsnaga: yup.number().typeError('Unesite brojčanu vrednost...').moreThan(-0.00001, 'Unesite pozitivnu vrednost...').required()
  });

  const meteringSchema2 = yup.object().shape({
    vt: yup.number().typeError('Unesite brojčanu vrednost...').moreThan(-0.00001, 'Unesite pozitivnu vrednost...').required(),
    nt: yup.number().typeError('Unesite brojčanu vrednost...').moreThan(-0.00001, 'Unesite pozitivnu vrednost...').required(),
    odosnaga: yup.number().typeError('Unesite brojčanu vrednost...').moreThan(-0.00001, 'Unesite pozitivnu vrednost...').required()
  });

  const meteringSchema3 = yup.object().shape({
    jt: yup.number().typeError('Unesite brojčanu vrednost...').moreThan(-0.00001, 'Unesite pozitivnu vrednost...').required(),
    odosnaga: yup.number().typeError('Unesite brojčanu vrednost...').moreThan(-0.00001, 'Unesite pozitivnu vrednost...').required()
  });

  export { meteringSchema1, meteringSchema2, meteringSchema3 }