import { html } from 'lit-ntml';
import { emailStyles } from './email-styles';
import { simpleEmailTemplate } from './template/simple-email-template';

export const emailLayout = async (subject: string) => html`
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>${subject}</title>
      ${emailStyles}
    </head>
    <body class="">
      ${simpleEmailTemplate({})}
    </body>
  </html>
`;

(async () => {
  const d = await emailLayout('sdfsdf');
  console.log(d);
})();
