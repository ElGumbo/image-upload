import { z } from 'zod/v4';

const userSchema = z.strictObject({
  firstName: z.preprocess(
    (val) => (Array.isArray(val) ? val[0] : val),
    z.string().min(1, 'First name is required')
  ),
  lastName: z.preprocess(
    (val) => (Array.isArray(val) ? val[0] : val),
    z.string().min(1, 'Last name is required')
  ),
  email: z.preprocess(
    (val) => (Array.isArray(val) ? val[0] : val),
    z.email('Invalid email.')
  ),
  image: z
    .url({ protocol: /^https?$/, hostname: z.regexes.domain })
    .default(
      'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'
    )
});

export { userSchema };