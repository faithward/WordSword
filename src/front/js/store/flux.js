const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      email: "",
      firstName: "",
      textFile: null, //creating storage for the files we will work with and return
      textArray: null,
      displayText: [],
      message: null,
      verifiedUser: false,
      newUser: false,
      token: "",
      savedData: [],
      savedId: [],
      savedTitles: [],
      savedNewText: [],
      splicedText: [],
      keyTerms: {},
      userID: null,
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      checkVerifiedUser: () => {
        //can probably delete later use for something earlier on
        const store = getStore();
      },
      setFile: (fileName) => {
        //needs to call API to send it to backend
        setStore({ textFile: fileName });
      },
      handlePaste: (txt) => {
        setStore({ textArray: txt });
      },
      signOut: () => {
        //resetting store values
        setStore({
          token: "",
          verifiedUser: false,
          email: "",
          newUser: false,
          firstName: "",
        });
      },
      parseSaveddData: () => {
        var data = getStore()
        data = data.savedData;
        var idArr = [];
        var titleArr = [];
        var newTextArr = [];
        data.forEach((element, index, arr) => {
          element.forEach((element2, index2, arr2) => {
            for (const property in element2) {
              if (property == "id") {
                idArr.push(element2[property]);
              }
              if (property == "title") {
                titleArr.push(element2[property]);
              }
              if (property == "new_text") {
                newTextArr.push(element2[property]);
              }
            }
          });
        })
        setStore( { savedId: idArr, savedTitles: titleArr, savedNewText: newTextArr } );
      },
      getSavedData: async () => {
        await fetch(process.env.BACKEND_URL + "/api/info", {
          method: "GET",
          headers: {},
          //redirect: "follow",
        })
          .then((response) => response.json())
          .then((result) => {
            //
            var userData = [];
            for (var i in result) {
              userData.push([i, result[i]]);
            }
            setStore({ savedData: userData });
          })
          .then(() => {
            getActions().parseSaveddData()
          })
          .catch((err) => {
            //error checking
            console.log("this is the saved data error: ", err);
          });
      },
      createUser: async (fName, lName, mail, pass) => {
        await fetch(process.env.BACKEND_URL + "/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: fName,
            lastName: lName,
            email: mail,
            password: pass,
            is_active: true,
          }),
          // /* redirect: "follow", */
        })
          .then((response) => response.json())
          .then((result) => {
            //set store value newUser to conditionally welcome first timers
            setStore({ newUser: true });
            //console.log("this is the create user result", result);
          })
          .catch((err) => console.log("this is the create user error: ", err));
      },
      getToken: async (email, password) => {
        await fetch(process.env.BACKEND_URL + "/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          redirect: "follow",
        })
          .then((response) => response.json())
          .then((result) => {
            setStore({ token: result.access_token });
          })
          .then(() => {
            getActions().getVerified()  
          })
          .catch((err) => console.log("this is the token error: ", err));
      },
      getVerified: async () => {
        await fetch(process.env.BACKEND_URL + "/api/protected", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + getStore().token,
          },
          redirect: "follow",
        })
          .then((response) => response.json())
          .then((result) => {
            setStore({
              verifiedUser: true,
              firstName: result.firstName,
              email: result.email,
              userID: result.user_id,
            });
          })
          .then(() => {
            getActions().getSavedData()
          })
          .catch((err) => {
            //error checking
            console.log("this is the get verified error: ", err);
          });
      },
      findKeyTerms: () => {
        //function to go through each word in the text array and create another array with each word and its count
        const store = getStore();
        let firstArray = store.textArray.split(" ");
        let wordArray = firstArray.map((element) => element.toUpperCase());
        //console.log(wordArray);
        const counts = {};
        //counting up words with loops
        for (let i = 0; i < wordArray.length; i++) {
          if (Object.keys(counts).length == 0) {
            counts[wordArray[i]] = 1;
          } else if (Object.keys(counts).includes(wordArray[i]) == true) {
            counts[wordArray[i]] += 1;
          } else {
            counts[wordArray[i]] = 1;
          }
        }
        //has now stored all words with how often they appear
        //create a list of common words and get rid of them from our word count object
        const commonWords = [
          "THE",
          "OF",
          "AND",
          "A",
          "TO",
          "IN",
          "IS",
          "YOU",
          "THAT",
          "IT",
          "HE",
          "WAS",
          "FOR",
          "ON",
          "ARE",
          "AS",
          "WITH",
          "HIS",
          "THEY",
          "I",
          "AT",
          "BE",
          "THIS",
          "HAVE",
          "FROM",
          "OR",
          "ONE",
          "HAD",
          "BY",
          "WORD",
          "BUT",
          "NOT",
          "WHAT",
          "ALL",
          "WERE",
          "WE",
          "WHEN",
          "YOUR",
          "CAN",
          "SAID",
          "THERE",
          "USE",
          "AN",
          "EACH",
          "WHICH",
          "SHE",
          "DO",
          "HOW",
          "THEIR",
          "IF",
          "WILL",
          "UP",
          "OTHER",
          "ABOUT",
          "OUT",
          "MANY",
          "THEN",
          "THEM",
          "THESE",
          "SO",
          "SOME",
          "HER",
          "WOULD",
          "MAKE",
          "LIKE",
          "HIM",
          "INTO",
          "TIME",
          "HAS",
          "LOOK",
          "TWO",
          "MORE",
          "WRITE",
          "GO",
          "SEE",
          "NUMBER",
          "NO",
          "WAY",
          "COULD",
          "PEOPLE",
          "MY",
          "THAN",
          "FIRST",
          "WATER",
          "BEEN",
          "CALL",
          "WHO",
          "ITS",
          "NOW",
          "FIND",
          "LONG",
          "DOWN",
          "DAY",
          "DID",
          "GET",
          "COME",
          "MADE",
          "MAY",
          "PART",
          "OURS",
          "SIT",
          "SAT",
          "OUR",
          "TAKE",
          "OURS",
          "HERS",
          "HIS",
          "THEIRS",
          "CAN",
          "CANNOT",
          "USUALLY",
          "OFTEN",
          "SOMETIMES",
        ];
        //change count number for common words to zero so they won't be registered
        for (let i = 0; i < Object.keys(counts).length; i++) {
          let currentWord = Object.keys(counts)[i];
          if (commonWords.includes(currentWord) == true) {
            counts[currentWord] = 0;
          }
        }
        //console.log(counts);
        //sort words to find top ten most common
        const keyWords = {};
        Object.keys(counts)
          .sort((a, b) => counts[b] - counts[a])
          .forEach((key, ind) => {
            if (ind < 10) {
              keyWords[key] = counts[key];
            }
          });
        setStore({ keyTerms: keyWords });
      },
      displayKeyTerms: () => {
        const store = getStore();
        console.log(store.keyTerms);
      },
      sliceText: () => {
        //placehold
        const resultText = [];
        const store = getStore();
        const newArray = store.textArray.split(/\r?\n/); //splits text by new line to get paragraphs
        //console.log(newArray);
        for (let i = 0; i < newArray.length; i++) {
          //for each paragraph
          const currentParagraph = newArray[i].match(
            /\(?[^\.\?\!]+[\.!\?]\)?/g
          ); //create an array containing each line in a paragraph
          //TIP: the above match patterns are from a system called regex, helpful to learn! xoxo, Faith
          //console.log(currentParagraph);
          if (currentParagraph != null) {
            let chunkArray = []; //
            for (let j = 0; j < currentParagraph.length; j++) {
              //for each line in the paragraph
              let newString = currentParagraph[j];
              if (j == 0) {
                if (newString.length < 50) {
                  //console.log("Entered short condition");
                  chunkArray.push(newString);
                  let nextString = currentParagraph[j + 1];
                  chunkArray.push(nextString);
                } else {
                  chunkArray.push(newString);
                }
              } else if (j == currentParagraph.length - 1) {
                if (newString.length < 50) {
                  //console.log("Entered short condition");
                  let prevString = currentParagraph[j - 1];
                  chunkArray.push(prevString);
                  chunkArray.push(newString);
                } else {
                  chunkArray.push(newString);
                }
              }
              //console.log("End j loop");
            } //ends j loop
            //console.log(chunkArray)
            resultText.push(chunkArray);
          } //closes if not null statement
        } //ends i loop
        //console.log(resultText);
        setStore({ displayText: resultText });
      }, //closes slice text
      readDisplay: () => {
        const store = getStore();
        let display = store.displayText;
        if (display != null) {
          for (let i = 0; i < display.length; i++) {
            if (display[i] != null) {
              let paragraph = "";
              for (let j = 0; j < display[i].length; j++) {
                paragraph += display[i][j];
              }
              console.log(paragraph);
            }
          }
        }
      },
      handlePDF: async (fileInfo) => {
        await fetch(process.env.BACKEND_URL + "/api/fileupload"), {
          method: 'POST',
          headers: {
          'content-type': 'multipart/form-data'
          //'X-RapidAPI-Key': 'TzFCCdgoB_1utwc15OwNepOqX0XEAn88',
          //'X-RapidAPI-Host': 'ocr-nanonets.p.rapidapi.com'
          },
          body: fileInfo,
        }
	      .then(res => res.json())
	      .then(json => console.log(json))
	      .catch(err => console.error('error:' + err));
        },
      saveText: async (inputTitle) => {
        const store = getStore();
        await fetch(process.env.BACKEND_URL + "/api/info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: inputTitle,
            user_id: store.userID,
            new_text: store.displayText,
          }),
          // /* redirect: "follow", */
        })
          .then((response) => response.json())
          .then((result) => {
            console.log("New info created");
          })
          .catch((err) => console.log("Info creation error: ", err));
      },
    }, //closes actions
  };
};
export default getState;
