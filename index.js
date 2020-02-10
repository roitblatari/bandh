// // var createdJobIndex = () => {
// //   $('.list').on("click", function (e) {
// //     // debugger
// //     e.preventDefault()

//     $.ajax({
//       url: "https://www.bhphotovideo.com/bnh/controller/home/?A=GetQuickEndecaSearch&N=3929443921%2B35%2B38&O=&Q=json&_=1581019613986",
//       method: 'GET',
//       dataType: 'json'
//     }).success(function (resp) {// json data arrived    resp is an array
//       // clearAppDivId()
//       let jobData
//       resp.map(i => {// let jobData =  new Job lookup how to map through ALL of resp
//        debugger
//         // jobData = new Job(i) // jobData is an instance of Job
//         // jobData.jobHTML() // call .jobHTML() on the instance of Job (jobData) to create the html string that we can append to the DOM
//         // let jobDataHtml = jobData.jobHTML()
//         // $('#app-div-id').append(jobDataHtml)    // append jobDataHtml to the DOM in the div you specified
//       })
//     })
//   // })


const load = () => {
      fetch('https://www.bhphotovideo.com/bnh/controller/home/?A=GetQuickEndecaSearch&N=3929443921%2B35%2B38&O=&Q=json&_=1581019613986')
        .then((r) => r.json())
        .then( r => console.log(r)
        )
    }
    window.onload = load; 