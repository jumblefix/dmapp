import { html } from 'lit-ntml';

interface SimpleEmailProps {
  subject?: string;
  salutation?: string;
  messageLineOne?: string;
  buttonText?: string;
  buttonLink?: string;
  messageLineTwo?: string;
  messageLineThree?: string;
}

export const simpleEmailTemplate = ({
  subject = 'Example email subject',
  salutation = 'Hi User',
  messageLineOne = `Sometimes you just want to send a simple HTML email with a simple design and clear call to action. This is it.`,
  buttonText = 'Call To Action',
  buttonLink = 'http://example.com',
  messageLineTwo = `This is a really simple email template. Its sole purpose is to get the recipient to click the button with no distractions.`,
  messageLineThree = `Good luck! Hope it works.`,
}: SimpleEmailProps) => html`
  <span class="preheader">${subject}</span>
  <table
    role="presentation"
    border="0"
    cellpadding="0"
    cellspacing="0"
    class="body"
  >
    <tr>
      <td>&nbsp;</td>
      <td class="container">
        <div class="content">
          <!-- START CENTERED WHITE CONTAINER -->
          <table role="presentation" class="main">
            <!-- START MAIN CONTENT AREA -->
            <tr>
              <td class="wrapper">
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                >
                  <tr>
                    <td>
                      <p>${salutation},</p>
                      <p>
                        ${messageLineOne}
                      </p>
                      <table
                        role="presentation"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="btn btn-primary"
                      >
                        <tbody>
                          <tr>
                            <td align="left">
                              <table
                                role="presentation"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                              >
                                <tbody>
                                  <tr>
                                    <td>
                                      <a href="${buttonLink}" target="_blank"
                                        >${buttonText}</a
                                      >
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p>
                        ${messageLineTwo}
                      </p>
                      <p>${messageLineThree}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- END MAIN CONTENT AREA -->
          </table>

          <!-- END CENTERED WHITE CONTAINER -->

          <!-- START FOOTER -->
          <div class="footer">
            <table
              role="presentation"
              border="0"
              cellpadding="0"
              cellspacing="0"
            >
              <tr>
                <td class="content-block">
                  <span class="apple-link"
                    >Company Inc, 3 Abbey Road, San Francisco CA 94102</span
                  >
                  <br />
                  Don't like these emails?
                  <a href="http://i.imgur.com/CScmqnj.gif">Unsubscribe</a>.
                </td>
              </tr>
              <tr>
                <td class="content-block powered-by">
                  Powered by <a href="http://htmlemail.io">HTMLemail</a>.
                </td>
              </tr>
            </table>
          </div>
          <!-- END FOOTER -->
        </div>
      </td>
      <td>&nbsp;</td>
    </tr>
  </table>
`;
