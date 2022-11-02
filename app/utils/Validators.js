const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const isEmailValid = (email) =>{
    return regex.test(email)
}