// import { Field, Form, Formik } from 'formik';
// import React, { Component } from 'react';
// import { Button } from '../src/components/ui/Button';
// import { RegisterComponent } from '../src/generated/generated';
// import { userSchema } from '../src/utils/common';

// export default class Register extends Component {
//   render() {
//     return (
//       <div>
//         <RegisterComponent>
//           {register => (
//             <Formik
//               initialValues={{
//                 email: '',
//                 name: '',
//                 mobile: '',
//                 password: '',
//               }}
//               validationSchema={userSchema}
//               onSubmit={async (
//                 data,
//                 { setErrors, resetForm, setSubmitting },
//               ) => {
//                 try {
//                   const res = await register({
//                     variables: {
//                       data,
//                     },
//                   });
//                   if (res) {
//                     const {
//                       data: {
//                         register: { name, email },
//                       },
//                     } = res;
//                     console.log(name);
//                     console.log(email);
//                     resetForm();
//                   }
//                   setSubmitting(false);
//                 } catch (err) {
//                   displayErrors(err, setErrors, setSubmitting);
//                 }
//               }}
//             >
//               {({ isSubmitting }) => {
//                 return (
//                   <Form>
//                     <h2>Register</h2>
//                     <Field component={ErrorField} />
//                     <Field
//                       name="name"
//                       placeholder="full name"
//                       component={InputField}
//                     />
//                     <Field
//                       name="email"
//                       placeholder="email"
//                       component={InputField}
//                     />
//                     <Field
//                       name="mobile"
//                       placeholder="mobile"
//                       component={InputField}
//                     />
//                     <Field
//                       name="password"
//                       placeholder="password"
//                       type="password"
//                       component={InputField}
//                     />
//                     <Button disabled={isSubmitting} type="submit">
//                       Register
//                     </Button>
//                   </Form>
//                 );
//               }}
//             </Formik>
//           )}
//         </RegisterComponent>
//       </div>
//     );
//   }
// }
