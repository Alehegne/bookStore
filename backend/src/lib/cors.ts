import cors from 'cors'
export default function corsConfig(app:any){
    const corsConfig =  {
        origin:"http://localhost:3000",
        methods:['GET','POST','PUT','PATCH','DELETE'],
        allowedHeaders:["Content-type","Authorization"],
        credentials:true
    }
    app.use(cors(
       corsConfig
    ))
    
}