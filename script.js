

var searchButton=document.getElementById('search-button');

searchButton.addEventListener('click', displayWord);


//if clicked on search button
function displayWord(e){
    e.preventDefault();

    var searchWord=document.getElementById('search-box').value.toLowerCase();
    console.log(searchWord);

    fetch("https://words-definitions-dictionary-and-data-api.p.rapidapi.com/en/"+searchWord, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b64fafcfe6msh116356c587feb1ep1afe1cjsn4d6807ebd24f',
            'x-rapidapi-host': 'words-definitions-dictionary-and-data-api.p.rapidapi.com'
        }     
    })
        .then(response => response.json())
        .then(response => {
            console.log(response);
        

            var result=document.getElementById('result');

        
            //for the word and phonetics, if phonetics exists in the api => display, else dont display
            if(response[0].phonetic){
                var htmlContent=`
                <div id="word">${searchWord}</div> 
                <p id="pronounciation">${response[0].phonetic}</p>
                `;
            }
            else{
                var htmlContent=`
                <div id="word">${searchWord}</div>
                <div id="space"></div>
                `;
            }


            //for the partsofspeech, meaning and examples
            for(var j=0; j<(response.length); j++){
                for(var i=0; i<((response[j].meanings).length); i++){

                    //if example of the word meaning exists:
                    if(response[j].meanings[i].definitions[0].example){
                        htmlContent+=`
                     
                        <div id="word-details">
                            <p id="word-type">${response[j].meanings[i].partOfSpeech}</p>
                        </div>
    
                        <div id="meaning">
                            <p>${response[j].meanings[i].definitions[0].definition}</p>
                        </div>
    
                        <div id="examples">
                            <p>${response[j].meanings[i].definitions[0].example}</p>
                        </div>
                        `;
                    }
    
                    //if example doesnt exist:
                    else{
                        htmlContent+=`
                     
                        <div id="word-details">
                            <p id="word-type">${response[j].meanings[i].partOfSpeech}</p>
                        </div>
    
                        <div id="meaning">
                            <p>${response[j].meanings[i].definitions[0].definition}</p>
                        </div>
    
                        <div id="space"></div>
                        `;
    
                    }
                    
                }
            }

            
            //for read more to open wiktionary.com
            htmlContent+=`
                <div id="readMore">
                        <button id="readMore-button"><a href="${response[0].sourceUrls[0]}">Read more</a></button>
                </div>
            `

            result.innerHTML=htmlContent;      

        })

        //search not found
        .catch(err => {
            console.log(err);

            result.innerHTML=`<div meaning>
                                <p>No exact match found for "${searchWord}"</p>
                            </div>    `
        });
}



