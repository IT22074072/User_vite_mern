import * as yup from 'yup'

class ResetPassYup {
    passwordReset = yup.object({
        email:yup.string().email().required(),
    })
    addNewPass = yup.object({
        password:yup.string().min(8).required(),
        token:yup.string().required()
    })
}


export default ResetPassYup = new ResetPassYup();