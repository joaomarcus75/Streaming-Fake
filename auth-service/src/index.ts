import express, {Request,Response} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
app.use(express.json());

interface User{
    email:string;
    password:string;
    role:string;
}

const users:User[] = [];
const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '';

function generateTokens(user:User){
  //acessToken
  const acessToken = jwt.sign(
    {email:user.email, role:user.role},
    JWT_SECRET,
    {expiresIn: '15m'}
  );
  //refreshToken
  const refreshToken = jwt.sign(
    {email: user.email, role: user.role},
    JWT_REFRESH_SECRET,
    {expiresIn : '7d'}
  );

  return{acessToken, refreshToken};
}

app.post('/register',async(req,res): Promise<any> => {
    const {email,password} = req.body;
    const hash = await bcrypt.hash(password,10);
    users.push({email,password:hash,role:'user'});
    res.sendStatus(201);
})

app.post('/login', async(req,res): Promise<any> => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const{acessToken,refreshToken} = generateTokens(user);

    return res.json({acessToken,refreshToken});
  
  });

app.listen(3001,() => console.log('Auth service runnig on port 3001') )