const User=require('./users');
const createUser = async (userData) => {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error creating user');
    }
  };
const findUserByUsername=async(username)=>{
    try{
        const user=await User.findOne({username});
        return user;
    }catch(error){
        throw new Error('Error finding user');
    }
    };
module.exports={createUser,findUserByUsername};