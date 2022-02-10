const axios = require('axios')
const fs = require('fs')


function getFileName() {
  let date = new Date();
  console.log(date);
  if (date.getHours() <= 8) {
    date.setDate(date.getDate() - 1);
  }
  let dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let mm = date.getMonth() + 1; mm = mm < 10 ? "0" + mm : mm;
  let yyyy = date.getFullYear();

  let fileName = dd + "_" + mm + "_" + yyyy;
  return fileName;
}

exports.getData = async (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  const path = `./data/${getFileName()}.json`
  console.log("path is:", path)
  try {
    if (fs.existsSync(path)) {
      console.log("file exist")
      fs.readFile(path, { encoding: 'utf-8' }, function (err, data) {
        if (!err) {
          // console.log(JSON.parse(data));
          res.status(200).json({
            casesData: JSON.parse(data)
          })
        } else {
          console.log(err);
        }
      });
    }
    else {
      axios.get("https://www.mohfw.gov.in/data/datanew.json").then(apiRes => {
        console.log("file doesn't exist")
        console.log("creating file");
        fs.writeFile(path, JSON.stringify(apiRes.data),
          { encoding: "utf8" },
          (err) => {
            if (err)
              console.log("error in creating file", err)
            else console.log("file created")
          })
        res.status(200).json({
          casesData: apiRes.data
        })
      })
    }
  }
  catch (err) {
    res.status(404).json({
      error: err
    })
  }
}