import toast from 'react-hot-toast'

/**validate login page Username */
export async function usernameValidate(values){
    const errors = usernameVerify({}, values)
    return errors;
}
/**validate password async */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);
    return errors;
}

/**validate reset password*/
export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);
    
    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error('password not match...!')
    }
    return errors;

}

/**validate register form */
export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values)
    emailVerify(errors, values);
    return errors;
}


/**validate password */
function passwordVerify(errors = {}, values){
    
    if(!values.password){
        errors.password = toast.error('Password Required..!');  
   /* }else if(values.password.includes('')){
        errors.password = toast.error('Wrong Password..!'); */
    }else if(values.password.length < 4){
        errors.password = toast.error('Password must be more than 4 character long..!');  
    }return errors;
    

}
/**validate username */
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Username Required..!');
    }else if(values.username.includes('')){
        error.username = toast.error('Invalid Username..!');
    }
    return error;
}

/**validate email */
function emailVerify(errors = {}, values){
    if(!values.email){
        errors.email = toast.error('Email Required....!');
    }else if(values.email.include('')){
        errors.email = toast.error('Wrong Email..!');
    }
}