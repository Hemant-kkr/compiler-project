function compileCode() {
  const code = document.getElementById("code").value;
  console.log(code);
  const langId = document.getElementById("language").value;
  const outputBox = document.getElementById("output");
  if (!code) {
    outputBox.textContent = "Please enter some code.";
    return;
  }
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `https://course.codequotient.com/api/executeCode`, true);
  xhr.setRequestHeader("content-type", "application/json");

  xhr.setRequestHeader("Accept", "application/json");
  const userData = JSON.stringify({ code, langId });
  xhr.onload = function () {
    const res = xhr.responseText;
    console.log(res);
    const data = JSON.parse(res);
    console.log(data);
    if (data.error) {
      output.innerText = `Error: ${data.error}`;
    }
    else {
      const codeId = data.codeId;
      let interval = setInterval(() => {
        const resultXhr = new XMLHttpRequest();
        resultXhr.open("GET", `https://course.codequotient.com/api/codeResult/${codeId}`);

        resultXhr.onload = () => {
          if (resultXhr.status === 200) {
          
            const resultData = resultXhr.responseText;
          
            const Outputdata= JSON.parse(resultData);
            const data =JSON.parse(Outputdata.data)
            
            if (data) 
              {
                clearInterval(interval);
                 if (data.errors) {
                output.innerText = `Error:\n  ${data.errors}`;
                  }
                   else
                    {
                    output.innerText = `${data.output}`;
                    }
              }
          }
        };

        resultXhr.send();
      }, 2000);
    }


  };
  xhr.send(userData);
}