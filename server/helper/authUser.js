import bcrypt from 'bcrypt';

export const hashPassword = (password)=>{
 let passwordHashed = bcrypt.genSalt(12, (err, hashed) => {
        if (err) {
            console.log(err);
        }
        bcrypt.hash(password, hashed, async (err, hashedPassword) => {
            if (err) {
                console.log(err);
            }
            console.log('result',hashedPassword );
            return hashedPassword
        })
    });
    return passwordHashed;
}

export const comparePassword = async(password,hashpass)=>{
    return  await bcrypt.compare(password,hashpass);
}