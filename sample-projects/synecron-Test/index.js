var acctData = [
    {
    "acctNum": "AAA - 1234",
    "user": "Alice"
    },
    {
    "acctNum": "AAA - 5231",
    "user": "Bob"
    },
    {
    "acctNum": "AAA - 9921",
    "user": "Alice"
    },
    {
    "acctNum": "AAA - 8191",
    "user": "Alice"
    }
    ];

    var balance = {
        "AAA - 1234": 4593.22,
        "AAA - 9921": 0,
        "AAA - 5231": 232142.5,
        "AAA - 8191": 4344
        };


        //first step starts

 function sorting(user="", sort="asc"){
    if(user != null){
      var data=acctData.filter(e=>e.user == user);
      var sorting=data.sort((a,b)=> {
        if(sort=="asc"){
          return 1
        }
        else if("dsc"){
          return -1
        }
      })
      
      console.log(sorting)
    }
  }
  sorting("Bob", "dsc")

  
 //first step ends




 //second step starts

var bobdata=acctData.filter(e=>e.user==="Bob")
console.log(bobdata)

var Charlie=acctData.filter(e=>e.user==="Charlie")
console.log(Charlie)

var alice=acctData.filter(e=>e.user==="Alice")
console.log(alice);

alice.sort((a,b)=>(a.acctNum > b.acctNum)? 1: -1)




 //second step ends