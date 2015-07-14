function handleKeyPress(e){
    if(e.keyCode === 13){
        alert(document.getElementById("search").value);
    }
    return false;
}