//AWS EC2 
module.exports={
    app:[
        {
            name:"project-management",
            script:"npm",
            args:"run dev",
            env:{
                NODE_ENV:"development",
            },
        },
    ],
};