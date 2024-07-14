export const namaVerification=(name:string):boolean=>{
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
}

export const emailVerification=(email:string):boolean=>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export const passwordVerification = (password: string): boolean => {
    if (password.length < 8) {
        return false;
      }
      const passwordRegex = /^(?=.*[#&@%])[a-zA-Z0-9#&@%]{8,}$/;
      return passwordRegex.test(password);
  };