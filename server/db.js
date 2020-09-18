var mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true,
        useUnifiedTopology:true
    },
    function() {
        console.log('database connect successfully');

    } 
    );