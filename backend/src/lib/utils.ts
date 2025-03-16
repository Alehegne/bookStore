

export async function validatePosts(data:Record<string,any>){
    const requiredFields = ["title","description","coverImage","author","rating","release","genre","pages","newPrice","oldPrice","publishedAt"];
    const keys = Object.keys(data);
    for(let field of requiredFields){
        if(!keys.includes(field) || !data[field]){
            return {status:400,message:`${field} is required`};
        }
    }
    return {status:200,message:"Valid request"};
}